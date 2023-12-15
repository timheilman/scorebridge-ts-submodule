import { GraphQLSubscription } from "@aws-amplify/api";
import { CONNECTION_STATE_CHANGE, ConnectionState } from "@aws-amplify/pubsub";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AuthMode } from "./authMode";
import { Club, ClubDevice } from "./graphql/appsync";
import {
  allSubscriptionsI,
  setBornSubscriptionStatuses,
  setSubscriptionBirth,
  setSubscriptionStatus,
  subIdToSubGql,
} from "./subscriptionStatesSlice";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";

const log = tsSubmoduleLogFn("subscriptions.");

const pool: Record<string, unknown> = {};

export type SUBSCRIPTION_CALLBACK_TYPE<T extends keyof allSubscriptionsI> =
  T extends "createdClubDevice"
    ? { createdClubDevice: ClubDevice }
    : T extends "updatedClubDevice"
      ? { updatedClubDevice: ClubDevice }
      : T extends "deletedClubDevice"
        ? { deletedClubDevice: ClubDevice }
        : T extends "updatedClub"
          ? { updatedClub: Club }
          : never;

export interface AccessParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
  clubId: string;
  clubDeviceId?: string;
  authMode?: AuthMode;
}

export interface SubscriptionParams<T extends keyof allSubscriptionsI> {
  subId: T;
  callback: (arg0: SUBSCRIPTION_CALLBACK_TYPE<T>) => void;

  clubIdVarName?: string;
}

export type TypedSubscriptionParams<T extends keyof allSubscriptionsI> =
  AccessParams & SubscriptionParams<T>;

export const generateTypedSubscription = <T extends keyof allSubscriptionsI>(
  ap: AccessParams,
  subId: T,
  callback: (res: SUBSCRIPTION_CALLBACK_TYPE<T>) => void,
  clubIdVarName?: string,
) => {
  const subscriptionParams: TypedSubscriptionParams<T> = {
    subId,
    callback,
    clubIdVarName,
    ...ap,
  };
  typedSubscription(subscriptionParams);
};

// unfortunately there's a lot to do for type safety and shortcuts are taken within
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment */
function handleAmplifySubscriptionError<T extends keyof allSubscriptionsI>(
  dispatch: any,
  subId: T,
) {
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

function handleUnexpectedSubscriptionError<T extends keyof allSubscriptionsI>(
  e: any,
  dispatch: any,
  subId: T,
) {
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

export const typedSubscription = <T extends keyof allSubscriptionsI>({
  subId,
  clubId,
  clubDeviceId,
  callback,
  dispatch,
  clubIdVarName,
  authMode,
}: TypedSubscriptionParams<T>) => {
  try {
    deleteSub(dispatch, subId);
    const variables: Record<string, unknown> = {};
    variables[clubIdVarName || "clubId"] = clubId;
    if (clubDeviceId) {
      variables["clubDeviceId"] = clubDeviceId;
    }

    const gql = subIdToSubGql[subId];
    log("typedSubscription", "debug", variables);
    pool[subId] = API.graphql<
      GraphQLSubscription<SUBSCRIPTION_CALLBACK_TYPE<typeof subId>>
    >({
      authMode: authMode || "AMAZON_COGNITO_USER_POOLS",
      ...graphqlOperation(gql, variables),
    }).subscribe({
      next: (data: any) => callback(data.value.data),
      error: handleAmplifySubscriptionError(dispatch, subId),
    });
    dispatch(setSubscriptionStatus([subId, "successfullySubscribed"]));
    dispatch(setSubscriptionBirth(subId));
  } catch (e: any) {
    handleUnexpectedSubscriptionError(e, dispatch, subId);
  }
};

const deleteSub = (dispatch: any, subId: keyof allSubscriptionsI) => {
  if (pool[subId]) {
    // @ts-ignore
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
  authMode?: AuthMode;
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          current: payload.data.connectionState,
        });
        if (
          priorConnectionState !== ConnectionState.Connected &&
          payload.data.connectionState === ConnectionState.Connected
        ) {
          void fetchRecentData({ dispatch, clubId, clubDeviceId, authMode });
          dispatch(setBornSubscriptionStatuses("successfullySubscribed"));
        } else if (
          priorConnectionState === ConnectionState.Connected &&
          payload.data.connectionState !== ConnectionState.Connected
        ) {
          Object.keys(subIdToSubGql).forEach((subId) => {
            dispatch(
              setSubscriptionStatus([
                subId as keyof allSubscriptionsI,
                "disconnected post-birth",
              ]),
            );
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

/* eslint-enable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment */
