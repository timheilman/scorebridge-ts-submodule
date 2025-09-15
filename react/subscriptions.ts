import { CONNECTION_STATE_CHANGE, ConnectionState } from "aws-amplify/api";
import { Hub } from "aws-amplify/utils";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import type { Subscription } from "../graphql/appsync.js";
import type {
  KeyedGeneratedSubscription,
  SubscriptionNames,
} from "../graphql/subscriptions.js";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog.js";
import { cachedClient } from "./gqlClient.js";
import {
  clearSubscriptionState,
  setConnectionAttempted,
  setMostRecentSubscriptionError,
  setSubscriptionsConnectionState,
} from "./subscriptionStatesSlice.js";

const log = tsSubmoduleLogFn("subscriptions.");

export type GraphQLAuthMode =
  // | "apiKey"
  // | "oidc"
  // | "iam"
  // | "lambda"
  // | "none"
  "userPool";

export type OutType<T> = T extends KeyedGeneratedSubscription<
  infer NAME,
  unknown
>
  ? NeverEmpty<Pick<Subscription, NAME>>[NAME]
  : never;

// these next three types are pulled from AWS Amplify v6 source code
// For why these are copied-into this repo, see
// https://stackoverflow.com/questions/77783165/how-do-i-write-a-type-safe-function-signature-accepting-the-callback-function-fo
/**
 * Returns an updated response type to always return a value.
 */
type NeverEmpty<T> = {
  [K in keyof T]-?: Exclude<WithListsFixed<T[K]>, undefined | null>;
};
/**
 * Recursively looks through a result type and removes nulls and
 * and undefined from `PagedList` types.
 *
 * Although a graphql response might contain empty values in an
 * array, this will only be the case when we also have errors,
 * which will then be *thrown*.
 */
type WithListsFixed<T> = T extends PagedList<infer IT, infer NAME>
  ? PagedList<Exclude<IT, null | undefined>, NAME>
  : T extends Record<string, unknown>
  ? {
      [K in keyof T]: WithListsFixed<T[K]>;
    }
  : T;
/**
 * Describes a paged list result from AppSync, which can either
 * live at the top query or property (e.g., related model) level.
 */
interface PagedList<T, TYPENAME> {
  __typename: TYPENAME;
  nextToken?: string | null | undefined;
  items: T[];
}

export interface SubscriptionDetail<
  SUB_NAME extends SubscriptionNames,
  INPUT_TYPE
> {
  query: KeyedGeneratedSubscription<SUB_NAME, INPUT_TYPE>;
  variables: INPUT_TYPE;
  callback: (
    result: OutType<KeyedGeneratedSubscription<SUB_NAME, INPUT_TYPE>>
  ) => void;
}
// This type and function may seem convoluted, but they are informed by this excellent post:
// https://stackoverflow.com/questions/65129070/defining-an-array-of-differing-generic-types-in-typescript
export type ExistentiallyTypedSubscription = <R>(
  cb: <SUB_NAME extends SubscriptionNames, INPUT_TYPE>(
    subDet: SubscriptionDetail<SUB_NAME, INPUT_TYPE>
  ) => R
) => R;

export const existentiallyTypedSubscription =
  <SUB_NAME extends SubscriptionNames, INPUT_TYPE>(
    sd: SubscriptionDetail<SUB_NAME, INPUT_TYPE>
  ): ExistentiallyTypedSubscription =>
  (cb) =>
    cb(sd);
// short alias:
export const ets = existentiallyTypedSubscription;
export interface UseSubscriptionsParams {
  authMode?: GraphQLAuthMode;
  fetchRecentData: () => Promise<void>;
  subscriptionDetails: ExistentiallyTypedSubscription[];
  failedPostInitCallback?: (args: {
    subId: SubscriptionNames;
    errorMessage: string;
  }) => void;
}

type PoolType = Map<SubscriptionNames, { unsubscribe: () => void } | undefined>;

export function useSubscriptions({
  authMode = "userPool",
  fetchRecentData,
  subscriptionDetails,
  failedPostInitCallback,
}: UseSubscriptionsParams) {
  const pool: PoolType = useMemo(() => {
    return new Map<
      SubscriptionNames,
      { unsubscribe: () => void } | undefined
    >();
  }, []);
  const dispatch = useDispatch();

  const subscriptionNames = subscriptionDetails.map((ets) =>
    ets((subDets) => subDets.query.__subscriptionName)
  );
  log("useSubscriptions.mounting", "debug", {
    subscriptionNames: JSON.stringify(subscriptionNames),
  });
  useEffect(() => {
    const deleteSub = (subId: SubscriptionNames) => {
      const sub = pool.get(subId);
      if (sub) {
        sub.unsubscribe();
        pool.delete(subId);
        dispatch(clearSubscriptionState(subId));
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
      return (e: unknown) => {
        const castE = e as { errors?: { message?: string }[] };
        if (castE.errors?.length && castE.errors[0].message) {
          log("handleAmplifySubscriptionError.message", "error", {
            message: castE.errors[0].message,
            subId,
          });
          dispatch(
            setMostRecentSubscriptionError([
              subId,
              // TODO: scor-425 after extracting signIn to redux asyncThunk,
              // check for these messages and dispatch the relogin
              // scor-425: Connection failed: UnauthorizedException
              // scor-429: Connection failed: {"errors":[{"errorType":"401: Invalid Club Id","message":"Can only subscribe to ... from one's own ..." }]}
              `failed post-init w/message: ${castE.errors[0].message}`,
            ])
          );
          if (failedPostInitCallback) {
            failedPostInitCallback({
              subId,
              errorMessage: castE.errors[0].message,
            });
          }
          return;
        }
        log("handleAmplifySubscriptionError.unexpected", "error", {
          message: e,
        });
        dispatch(
          setMostRecentSubscriptionError([
            subId,
            `failed post-init w/o message: ${JSON.stringify(e, null, 2)}`,
          ])
        );
        if (failedPostInitCallback) {
          failedPostInitCallback({
            subId,
            errorMessage: JSON.stringify(e, null, 2),
          });
        }
      };
    };

    const handleUnexpectedSubscriptionError = (
      e: unknown,
      subId: SubscriptionNames
    ) => {
      log("handleUnexpectedSubscriptionError", "error", { subId, e });
      const castE = e as { message?: string };
      if (castE.message) {
        dispatch(
          setMostRecentSubscriptionError([
            subId,

            `failed at init w/message: ${castE.message}`,
          ])
        );
      } else {
        dispatch(
          setMostRecentSubscriptionError([
            subId,
            `failed at init w/o message: ${JSON.stringify(e)}`,
          ])
        );
      }
      return;
    };

    const errorCatchingSubscription = <
      SUB_NAME extends SubscriptionNames,
      INPUT_TYPE
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
        const graphqlResponse = cachedClient().graphql({
          authMode,
          query: query.gql,
          variables,
        });
        pool.set(
          subId,
          graphqlResponse.subscribe({
            next: ({ data }) => {
              callback(data[subId]);
            },
            error: handleAmplifySubscriptionError(subId),
          })
        );
        dispatch(setConnectionAttempted(subId));
        log("errorCatchingSubscription.ok", "debug", { subId });
      } catch (e: unknown) {
        handleUnexpectedSubscriptionError(e, subId);
      }
    };
    subscriptionDetails.forEach((ets) => {
      ets((subDets) => {
        errorCatchingSubscription({
          query: subDets.query,
          variables: subDets.variables,
          callback: subDets.callback,
        });
      });
    });

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
        log("hub.listen.channelApi.callback.connectionStateChange", "debug", {
          newConnectionState: connectionState,
          subscriptionNames: JSON.stringify(subscriptionNames),
        });
        dispatch(setSubscriptionsConnectionState(connectionState));
        if (connectionState === ConnectionState.Connected) {
          fetchRecentData().catch((e: unknown) => {
            log("fetchRecentData.rethrowingError", "error", { e });
            throw e;
          });
        }
      }
    });
    return () => {
      log("useSubscriptions.useEffect.unmounting", "debug", {
        subscriptionNames: JSON.stringify(subscriptionNames),
      });
      deleteAllSubs();
      stopListening();
    };
  }, [
    authMode,
    dispatch,
    failedPostInitCallback,
    fetchRecentData,
    pool,
    subscriptionDetails,
    subscriptionNames,
  ]);
}
