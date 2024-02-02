import { Dispatch } from "@reduxjs/toolkit";
import { CONNECTION_STATE_CHANGE, ConnectionState } from "aws-amplify/api";
import { Hub } from "aws-amplify/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Subscription } from "../graphql/appsync";
import {
  KeyedGeneratedSubscription,
  subIdToSubGql,
  SubscriptionNames,
} from "../graphql/subscriptions";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import { client } from "./gqlClient";
import {
  setBornSubscriptionStatuses,
  setSubscriptionBirth,
  setSubscriptionStatus,
} from "./subscriptionStatesSlice";

const log = tsSubmoduleLogFn("subscriptions.");

export type GraphQLAuthMode =
  | "apiKey"
  // | "oidc"
  // | "iam"
  // | "lambda"
  // | "none"
  | "userPool";
export const pool: Record<string, { unsubscribe: () => void }> = {};

export interface AccessParams {
  dispatch: Dispatch;
  clubId: string;
  clubDeviceId?: string;
  authMode?: GraphQLAuthMode;
}

export function handleAmplifySubscriptionError(
  dispatch: Dispatch,
  subId: SubscriptionNames,
) {
  log("handleAmplifySubscriptionError", "debug", { subId });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e?.errors?.length && e.errors[0].message) {
      log("handleAmplifySubscriptionError.message", "error", {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        message: e.errors[0].message,
      });
      dispatch(
        setSubscriptionStatus([
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
      setSubscriptionStatus([
        subId,
        `failed post-init w/o message: ${JSON.stringify(e, null, 2)}`,
      ]),
    );
  };
}

export function handleUnexpectedSubscriptionError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: any,
  dispatch: Dispatch,
  subId: SubscriptionNames,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  log("handleUnexpectedSubscriptionError", "error", { subId, e });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (e.message) {
    dispatch(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setSubscriptionStatus([subId, `failed at init w/message: ${e.message}`]),
    );
  } else {
    dispatch(
      setSubscriptionStatus([subId, `failed at init w/o message: ${e}`]),
    );
  }
  return;
}

export const deleteSub = (dispatch: Dispatch, subId: SubscriptionNames) => {
  if (pool[subId]) {
    pool[subId].unsubscribe();
    delete pool[subId];
    dispatch(setSubscriptionStatus([subId, "disconnected"]));
    return true;
  }
};
export const deleteAllSubs = (dispatch: Dispatch) => {
  Object.keys(pool).forEach((subId: string) => {
    log("deleteAllSubs", "debug", { subId });
    deleteSub(dispatch, subId as SubscriptionNames);
  });
};

export type OutType<T> = T extends KeyedGeneratedSubscription<
  infer NAME,
  unknown
>
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

    const stopListening = Hub.listen<{
      event: string;
      data: { connectionState: ConnectionState };
    }>("api", (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        log("hub.listen.connectionStateChange", "debug", {
          previous: priorConnectionState,
          current: payload.data.connectionState,
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
        priorConnectionState = payload.data.connectionState;
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
