import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionState } from "aws-amplify/api";

// import { Subscription } from "../graphql/appsync";
import { subIdToSubGql, SubscriptionNames } from "../graphql/subscriptions";

export interface SubscriptionStateType {
  mostRecentErrors: Record<SubscriptionNames, string | null>;
  connectionAttempted: Record<SubscriptionNames, boolean>;
  connected: Record<SubscriptionNames, boolean>;
  connectionState: ConnectionState;
}

const subIds = Object.keys(subIdToSubGql) as SubscriptionNames[];
export const initialState: SubscriptionStateType = {
  mostRecentErrors: Object.fromEntries(
    subIds.map((subId) => [subId, null]),
  ) as Record<SubscriptionNames, null>,
  connectionAttempted: Object.fromEntries(
    subIds.map((subId) => [subId, false]),
  ) as Record<SubscriptionNames, boolean>,
  connected: Object.fromEntries(
    subIds.map((subId) => [subId, false]),
  ) as Record<SubscriptionNames, boolean>,
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
        // mark any attempted connections without errors as currently connected
        for (const subId in subIdToSubGql) {
          if (
            state.connectionAttempted[subId as SubscriptionNames] &&
            state.mostRecentErrors[subId as SubscriptionNames] === null
          ) {
            state.connected[subId as SubscriptionNames] = true;
          }
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
