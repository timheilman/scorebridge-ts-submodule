import { CONNECTION_STATE_CHANGE, ConnectionState } from "aws-amplify/api";
import { Hub } from "aws-amplify/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Club, Subscription } from "../graphql/appsync";
import { getClubGql } from "../graphql/queries";
import {
  KeyedGeneratedSubscription,
  SubscriptionNames,
} from "../graphql/subscriptions";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import { client } from "./gqlClient";
import {
  setBornSubscriptionStatuses,
  setSubscriptionBirth,
  setSubscriptionStatus,
  subIdToSubGql,
} from "./subscriptionStatesSlice";

const log = tsSubmoduleLogFn("subscriptions.");

export type GraphQLAuthMode =
  | "apiKey"
  | "oidc"
  | "userPool"
  | "iam"
  | "lambda"
  | "none";
export const pool: Record<string, { unsubscribe: () => void }> = {};

export interface AccessParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
  clubId: string;
  clubDeviceId?: string;
  authMode?: GraphQLAuthMode;
}

export const getClub = async (
  { clubId, authMode, dispatch }: AccessParams,
  setClub: (c: Club) => unknown,
) => {
  const res = await client.graphql({
    query: getClubGql,
    variables: {
      clubId,
    },
    authMode,
  });
  if (res.errors) {
    throw new Error(JSON.stringify(res.errors, null, 2));
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  dispatch(setClub(res.data.getClub!));
};

// unfortunately there's a lot to do for type safety and shortcuts are taken within
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
export function handleAmplifySubscriptionError<T extends SubscriptionNames>(
  dispatch: any,
  subId: T,
) {
  log("handleAmplifySubscriptionError", "error", { subId });
  return (e: any) => {
    if (e?.errors?.length && e.errors[0].message) {
      log("handleAmplifySubscriptionError.message", "error", {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: e.errors[0].message,
      });
      dispatch(
        setSubscriptionStatus([
          subId,
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
      setSubscriptionStatus([
        subId,
        `failed post-init w/o message: ${JSON.stringify(e, null, 2)}`,
      ]),
    );
  };
}

export function handleUnexpectedSubscriptionError<T extends SubscriptionNames>(
  e: any,
  dispatch: any,
  subId: T,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  log("handleUnexpectedSubscriptionError", "error", { subId, e });
  if (e.message) {
    dispatch(
      setSubscriptionStatus([subId, `failed at init w/message: ${e.message}`]),
    );
  } else {
    dispatch(
      setSubscriptionStatus([subId, `failed at init w/o message: ${e}`]),
    );
  }
  return;
}

export const deleteSub = (dispatch: any, subId: SubscriptionNames) => {
  if (pool[subId]) {
    pool[subId].unsubscribe();
    delete pool[subId];
    dispatch(setSubscriptionStatus([subId, "disconnected"]));
    return true;
  }
};
export const deleteAllSubs = (dispatch: any) => {
  Object.keys(subIdToSubGql).forEach((subId: string) => {
    log("deleteAllSubs", "debug", { subId });
    deleteSub(dispatch, subId as SubscriptionNames);
  });
};

export type OutType<T> = T extends KeyedGeneratedSubscription<infer NAME, any>
  ? NeverEmpty<Pick<Subscription, NAME>>[NAME]
  : never;

// these next three types are pulled from AWS Amplify v6 source code
// For why these are copied-into this repo, see
// https://stackoverflow.com/questions/77783165/how-do-i-write-a-type-safe-function-signature-accepting-the-callback-function-fo
type NeverEmpty<T> = {
  [K in keyof T]-?: Exclude<WithListsFixed<T[K]>, undefined | null>;
};
type WithListsFixed<T> = T extends PagedList<infer IT, infer NAME>
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

export const errorCatchingSubscription = <
  SUB_NAME extends SubscriptionNames,
  INPUT_TYPE,
>({
  accessParams,
  query,
  variables,
  callback,
}: {
  accessParams: AccessParams;
  query: KeyedGeneratedSubscription<SUB_NAME, INPUT_TYPE>;
  variables: INPUT_TYPE;
  callback: (d: OutType<typeof query>) => void;
}) => {
  const subId = query.__subscriptionName;
  try {
    deleteSub(accessParams.dispatch, subId);
    log("errorCatchingSubscription", "debug", {
      subscriptionName: subId,
      ...variables,
    });
    const graphqlResponse = client.graphql({
      authMode: accessParams.authMode ?? "userPool",
      query: query.gql,
      variables,
    });
    pool[subId] = graphqlResponse.subscribe({
      next: (gqlSubMsg) => callback(gqlSubMsg.data[subId]),
      error: handleAmplifySubscriptionError(accessParams.dispatch, subId),
    });
    log("errorCatchingSubscription.ok", "debug", { subId });

    accessParams.dispatch(
      setSubscriptionStatus([subId, "successfullySubscribed"]),
    );
    log("errorCatchingSubscription.birth", "debug", { subId });

    accessParams.dispatch(setSubscriptionBirth(subId));
  } catch (e: unknown) {
    handleUnexpectedSubscriptionError(e, accessParams.dispatch, subId);
  }
};

export interface UseSubscriptionsParams {
  clubId: string;
  clubDeviceId?: string;
  subscribeToAll: (ap: AccessParams) => void;
  fetchRecentData: (ap: AccessParams) => Promise<void>;
  clearFetchedData: () => void;
  authMode?: GraphQLAuthMode;
}
export function useSubscriptions({
  clubId,
  clubDeviceId,
  subscribeToAll,
  fetchRecentData,
  clearFetchedData,
  authMode,
}: UseSubscriptionsParams) {
  const dispatch = useDispatch();

  useEffect(() => {
    let priorConnectionState: ConnectionState;
    subscribeToAll({ dispatch, clubId, clubDeviceId, authMode });

    const stopListening = Hub.listen("api", (data: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        log("hub.listen.connectionStateChange", "debug", {
          previous: priorConnectionState,
          current: payload.data.connectionState as ConnectionState,
        });
        if (
          priorConnectionState !== ConnectionState.Connected &&
          payload.data.connectionState === ConnectionState.Connected
        ) {
          void fetchRecentData({ dispatch, clubId, clubDeviceId, authMode });
          log("hub.listen.unconnectedToConnected", "debug");
          dispatch(setBornSubscriptionStatuses("successfullySubscribed"));
        } else if (
          priorConnectionState === ConnectionState.Connected &&
          payload.data.connectionState !== ConnectionState.Connected
        ) {
          log("hub.listen.connectedToUnconnected", "debug");
          Object.keys(subIdToSubGql).forEach((subId) => {
            dispatch(
              setSubscriptionStatus([
                subId as SubscriptionNames,
                "disconnected post-birth",
              ]),
            );
          });
        }
        priorConnectionState = payload.data.connectionState as ConnectionState;
      }
    });
    return () => {
      deleteAllSubs(dispatch);
      if (clearFetchedData) {
        clearFetchedData();
      }
      stopListening();
    };
  }, [
    authMode,
    clearFetchedData,
    clubDeviceId,
    clubId,
    dispatch,
    fetchRecentData,
    subscribeToAll,
  ]);
}

/* eslint-enable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
