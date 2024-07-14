import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionState } from "aws-amplify/api";

// import { Subscription } from "../graphql/appsync";
import { subIdToSubGql, SubscriptionNames } from "../graphql/subscriptions";

export interface SubscriptionStateType {
  mostRecentErrors: Record<SubscriptionNames, string | null>;
  connectionAttempted: Record<SubscriptionNames, boolean>;
  initiallyConnected: Record<SubscriptionNames, boolean>;
  connected: Record<SubscriptionNames, boolean>;
  connectionState: ConnectionState;
}

const initialState: SubscriptionStateType = {
  mostRecentErrors: Object.keys(subIdToSubGql).reduce(
    (acc, subId: string) => {
      acc[subId as SubscriptionNames] = null;
      return acc;
    },
    {} as SubscriptionStateType["mostRecentErrors"],
  ),
  connectionAttempted: Object.keys(subIdToSubGql).reduce(
    (acc, subId: string) => {
      acc[subId as SubscriptionNames] = false;
      return acc;
    },
    {} as SubscriptionStateType["connectionAttempted"],
  ),
  initiallyConnected: Object.keys(subIdToSubGql).reduce(
    (acc, subId: string) => {
      acc[subId as SubscriptionNames] = false;
      return acc;
    },
    {} as SubscriptionStateType["initiallyConnected"],
  ),
  connected: Object.keys(subIdToSubGql).reduce(
    (acc, subId: string) => {
      acc[subId as SubscriptionNames] = false;
      return acc;
    },
    {} as SubscriptionStateType["connected"],
  ),
  connectionState: ConnectionState.Disconnected,
};

export const subscriptionStatesSlice = createSlice({
  name: "subscriptionStates",
  initialState,
  reducers: {
    setMostRecentSubscriptionError: (
      state,
      action: PayloadAction<[SubscriptionNames, string | null]>,
    ) => {
      state.mostRecentErrors[action.payload[0]] = action.payload[1];
      state.connected[action.payload[0]] = false;
    },
    setConnectionAttempted: (
      state,
      action: PayloadAction<SubscriptionNames>,
    ) => {
      state.connectionAttempted[action.payload] = true;
    },
    setSubscriptionsConnectionState: (
      state,
      action: PayloadAction<ConnectionState>,
    ) => {
      state.connectionState = action.payload;
      if (action.payload === ConnectionState.Connected) {
        // mark any attempted connections without errors as initially and currently connected
        for (const subId in subIdToSubGql) {
          if (
            state.connectionAttempted[subId as SubscriptionNames] &&
            state.mostRecentErrors[subId as SubscriptionNames] === null
          ) {
            state.initiallyConnected[subId as SubscriptionNames] = true;
          }
        }
        // mark any initially connected subscriptions as (re- or initially) connected
        for (const subId in subIdToSubGql) {
          state.connected[subId as SubscriptionNames] =
            state.initiallyConnected[subId as SubscriptionNames];
        }
      } else {
        for (const subId in subIdToSubGql) {
          state.connected[subId as SubscriptionNames] = false;
        }
      }
    },
    clearSubscriptionState: (
      state,
      action: PayloadAction<SubscriptionNames>,
    ) => {
      state.mostRecentErrors[action.payload] = null;
      state.connectionAttempted[action.payload] = false;
      state.initiallyConnected[action.payload] = false;
      state.connected[action.payload] = false;
    },
  },
});

export const {
  setMostRecentSubscriptionError,
  setSubscriptionsConnectionState,
  setConnectionAttempted,
  clearSubscriptionState,
} = subscriptionStatesSlice.actions;

export const selectMostRecentSubscriptionErrorById =
  (subId: SubscriptionNames) =>
  (state: { subscriptionStates: SubscriptionStateType }) => {
    return state.subscriptionStates.mostRecentErrors[subId];
  };
export const selectConnectionAttempted =
  (subId: SubscriptionNames) =>
  (state: { subscriptionStates: SubscriptionStateType }) => {
    return state.subscriptionStates.connectionAttempted[subId];
  };
export const selectInitiallyConnected =
  (subId: SubscriptionNames) =>
  (state: { subscriptionStates: SubscriptionStateType }) => {
    return state.subscriptionStates.initiallyConnected[subId];
  };
export const selectConnected =
  (subId: SubscriptionNames) =>
  (state: { subscriptionStates: SubscriptionStateType }) => {
    return state.subscriptionStates.connected[subId];
  };

export const selectAllConnected = (state: {
  subscriptionStates: SubscriptionStateType;
}) => state.subscriptionStates.connected;

export const selectSubscriptionsConnectionState = (state: {
  subscriptionStates: SubscriptionStateType;
}) => state.subscriptionStates.connectionState;

export default subscriptionStatesSlice.reducer;
