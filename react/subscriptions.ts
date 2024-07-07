import { CONNECTION_STATE_CHANGE, ConnectionState } from "aws-amplify/api";
import { Hub } from "aws-amplify/utils";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { Subscription } from "../graphql/appsync";
import {
  KeyedGeneratedSubscription,
  SubscriptionNames,
} from "../graphql/subscriptions";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import { client } from "./gqlClient";
import {
  setSubscriptionStatus,
  setSubscriptionStatusIfInitSucceeded,
} from "./subscriptionStatesSlice";

const log = tsSubmoduleLogFn("subscriptions.");

export type GraphQLAuthMode =
  | "apiKey"
  // | "oidc"
  // | "iam"
  // | "lambda"
  // | "none"
  | "userPool";

export type OutType<T> =
  T extends KeyedGeneratedSubscription<infer NAME, unknown>
    ? NeverEmpty<Pick<Subscription, NAME>>[NAME]
    : never;

// these next three types are pulled from AWS Amplify v6 source code
// For why these are copied-into this repo, see
// https://stackoverflow.com/questions/77783165/how-do-i-write-a-type-safe-function-signature-accepting-the-callback-function-fo
type NeverEmpty<T> = {
  [K in keyof T]-?: Exclude<WithListsFixed<T[K]>, undefined | null>;
};
type WithListsFixed<T> =
  T extends PagedList<infer IT, infer NAME>
    ? PagedList<Exclude<IT, null | undefined>, NAME>
    : // eslint-disable-next-line @typescript-eslint/ban-types
      T extends {}
      ? {
          [K in keyof T]: WithListsFixed<T[K]>;
        }
      : T;
interface PagedList<T, TYPENAME> {
  __typename: TYPENAME;
  nextToken?: string | null | undefined;
  items: T[];
}

export interface SubscriptionDetail<
  SUB_NAME extends SubscriptionNames,
  INPUT_TYPE,
> {
  query: KeyedGeneratedSubscription<SUB_NAME, INPUT_TYPE>;
  variables: INPUT_TYPE;
  callback: (
    result: OutType<KeyedGeneratedSubscription<SUB_NAME, INPUT_TYPE>>,
  ) => void;
}
// This type and function may seem convoluted, but they are informed by this excellent post:
// https://stackoverflow.com/questions/65129070/defining-an-array-of-differing-generic-types-in-typescript
export type ExistentiallyTypedSubscription = <R>(
  cb: <SUB_NAME extends SubscriptionNames, INPUT_TYPE>(
    subDet: SubscriptionDetail<SUB_NAME, INPUT_TYPE>,
  ) => R,
) => R;

export const existentiallyTypedSubscription =
  <SUB_NAME extends SubscriptionNames, INPUT_TYPE>(
    sd: SubscriptionDetail<SUB_NAME, INPUT_TYPE>,
  ): ExistentiallyTypedSubscription =>
  (cb) =>
    cb(sd);
// short alias:
export const ets = existentiallyTypedSubscription;
export interface UseSubscriptionsParams {
  authMode?: GraphQLAuthMode;
  fetchRecentData: () => Promise<void>;
  subscriptionDetails: ExistentiallyTypedSubscription[];
}

type PoolType = Record<SubscriptionNames, { unsubscribe: () => void }>;

export function useSubscriptions({
  authMode = "userPool",
  fetchRecentData,
  subscriptionDetails,
}: UseSubscriptionsParams) {
  const pool: PoolType = useMemo(() => {
    return {} as PoolType;
  }, []);
  const dispatch = useDispatch();

  const subscriptionNames = subscriptionDetails.map((ets) =>
    ets((subDets) => subDets.query.__subscriptionName),
  );
  useEffect(() => {
    const deleteSub = (subId: SubscriptionNames) => {
      if (pool[subId]) {
        pool[subId].unsubscribe();
        delete pool[subId];
        dispatch(setSubscriptionStatusIfInitSucceeded([subId, "deleted"]));
        return true;
      }
    };
    const deleteAllSubs = () => {
      Object.keys(pool).forEach((subId: string) => {
        log("deleteAllSubs", "debug", { subId });
        deleteSub(subId as SubscriptionNames);
      });
    };
    const handleAmplifySubscriptionError = (subId: SubscriptionNames) => {
      log("handleAmplifySubscriptionError", "debug", { subId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (e?.errors?.length && e.errors[0].message) {
          log("handleAmplifySubscriptionError.message", "error", {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            message: e.errors[0].message,
            subId,
          });
          dispatch(
            setSubscriptionStatusIfInitSucceeded([
              subId,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              `failed post-init w/message: ${e.errors[0].message}`,
            ]),
          );
          return;
        }
        log("handleAmplifySubscriptionError.unexpected", "error", {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          message: e,
        });
        dispatch(
          setSubscriptionStatusIfInitSucceeded([
            subId,
            `failed post-init w/o message: ${JSON.stringify(e, null, 2)}`,
          ]),
        );
      };
    };

    const handleUnexpectedSubscriptionError = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      e: any,
      subId: SubscriptionNames,
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      log("handleUnexpectedSubscriptionError", "error", { subId, e });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.message) {
        dispatch(
          setSubscriptionStatus([
            subId,
            // must keep "failed at init" prefix; see setSubscriptionStatusIfInitSucceeded
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            `failed at init w/message: ${e.message}`,
          ]),
        );
      } else {
        dispatch(
          // must keep "failed at init" prefix; see setSubscriptionStatusIfInitSucceeded
          setSubscriptionStatus([subId, `failed at init w/o message: ${e}`]),
        );
      }
      return;
    };

    const errorCatchingSubscription = <
      SUB_NAME extends SubscriptionNames,
      INPUT_TYPE,
    >({
      query,
      variables,
      callback,
    }: SubscriptionDetail<SUB_NAME, INPUT_TYPE>) => {
      const subId = query.__subscriptionName;
      try {
        deleteSub(subId);
        log("errorCatchingSubscription", "debug", {
          subscriptionName: subId,
          ...variables,
        });
        const graphqlResponse = client.graphql({
          authMode: authMode ?? "userPool",
          query: query.gql,
          variables,
        });
        pool[subId] = graphqlResponse.subscribe({
          next: ({ data }) => callback(data[subId]),
          error: handleAmplifySubscriptionError(subId),
        });
        log("errorCatchingSubscription.ok", "debug", { subId });
      } catch (e: unknown) {
        handleUnexpectedSubscriptionError(e, subId);
      }
    };
    subscriptionDetails.forEach((ets) =>
      ets((subDets) => {
        errorCatchingSubscription({
          query: subDets.query,
          variables: subDets.variables,
          callback: subDets.callback,
        });
      }),
    );

    const stopListening = Hub.listen<{
      event: string;
      data: { query: string; connectionState: ConnectionState };
    }>("api", (data) => {
      log("hub.listen.channelApi.callback", "debug", {
        data,
        dataPayloadData: data.payload.data,
      });
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState;
        if (connectionState === ConnectionState.Connected) {
          subscriptionNames.forEach((subId) => {
            dispatch(
              setSubscriptionStatusIfInitSucceeded([
                subId,
                "successfullySubscribed",
              ]),
            );
          });
          fetchRecentData().catch((e) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            log("fetchRecentData.rethrowingError", "error", { e });
            throw e;
          });
        } else {
          subscriptionNames.forEach((subId) => {
            dispatch(
              setSubscriptionStatusIfInitSucceeded([subId, connectionState]),
            );
          });
        }
      }
    });
    return () => {
      deleteAllSubs();
      stopListening();
    };
  }, [
    authMode,
    dispatch,
    fetchRecentData,
    pool,
    subscriptionDetails,
    subscriptionNames,
  ]);
}
