import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { Subscription } from "../graphql/appsync";
import { subIdToSubGql, SubscriptionNames } from "../graphql/subscriptions";

export type SubscriptionStateType = Record<SubscriptionNames, string>;

const initialState: SubscriptionStateType = Object.keys(subIdToSubGql).reduce<
  Record<SubscriptionNames, string>
>((acc: SubscriptionStateType, subId: string) => {
  acc[subId as SubscriptionNames] = "disconnected";
  return acc;
}, {} as SubscriptionStateType);

export const subscriptionStatesSlice = createSlice({
  name: "subscriptionStates",
  initialState,
  reducers: {
    setSubscriptionStatusIfInitSucceeded: (
      state,
      action: PayloadAction<[SubscriptionNames, string]>,
    ) => {
      if (state[action.payload[0]].startsWith("failed at init")) {
        return;
      }
      state[action.payload[0]] = action.payload[1];
    },
    setSubscriptionStatus: (
      state,
      action: PayloadAction<[SubscriptionNames, string]>,
    ) => {
      state[action.payload[0]] = action.payload[1];
    },
  },
});

export const { setSubscriptionStatus, setSubscriptionStatusIfInitSucceeded } =
  subscriptionStatesSlice.actions;

export const selectSubscriptionStateById =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (subId: SubscriptionNames) => (state: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return state.subscriptionStates[subId];
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectSubscriptionStates = (state: any) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  state.subscriptionStates;

export default subscriptionStatesSlice.reducer;
