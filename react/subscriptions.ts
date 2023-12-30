// see https://github.com/aws-amplify/amplify-js/pull/12757 for a fix here
import { /* CONNECTION_STATE_CHANGE,*/ ConnectionState } from "aws-amplify/api";
import { Hub } from "aws-amplify/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import {
  allSubscriptionsI,
  setBornSubscriptionStatuses,
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

// unfortunately there's a lot to do for type safety and shortcuts are taken within
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
export function handleAmplifySubscriptionError<
  T extends keyof allSubscriptionsI,
>(dispatch: any, subId: T) {
  return (e: any) => {
    if (e?.error?.errors?.length && e.error.errors[0].message) {
      dispatch(
        setSubscriptionStatus([
          subId,
          `failed post-init w/message: ${e.error.errors[0].message}`,
        ]),
      );
      return;
    }
    dispatch(
      setSubscriptionStatus([subId, `failed post-init w/o message: ${e}`]),
    );
  };
}

export function handleUnexpectedSubscriptionError<
  T extends keyof allSubscriptionsI,
>(e: any, dispatch: any, subId: T) {
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

export const deleteSub = (dispatch: any, subId: keyof allSubscriptionsI) => {
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
    deleteSub(dispatch, subId as keyof allSubscriptionsI /* actually safe */);
  });
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
      if (
        payload.event ===
        /* CONNECTION_STATE_CHANGE; see top of file */ "ConnectionStateChange"
      ) {
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
                subId as keyof allSubscriptionsI,
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
