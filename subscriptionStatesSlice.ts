import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Subscription,
  SubscriptionOnCreateClubDeviceArgs,
  SubscriptionOnDeleteClubDeviceArgs,
  SubscriptionOnUpdateClubArgs,
  SubscriptionOnUpdateClubDeviceArgs,
} from "./graphql/appsync";
import {
  subscriptionOnCreateClubDevice,
  subscriptionOnDeleteClubDevice,
  subscriptionOnUpdateClub,
  subscriptionOnUpdateClubDevice,
} from "./graphql/subscriptions";

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};
// TODO: SCOR-143 see if we can eliminate this interface and use Subscription itself instead
export interface allSubscriptionsI {
  onCreateClubDevice: GeneratedSubscription<
    SubscriptionOnCreateClubDeviceArgs,
    Pick<Subscription, "onCreateClubDevice">
  >;
  onUpdateClubDevice: GeneratedSubscription<
    SubscriptionOnUpdateClubDeviceArgs,
    Pick<Subscription, "onUpdateClubDevice">
  >;
  onDeleteClubDevice: GeneratedSubscription<
    SubscriptionOnDeleteClubDeviceArgs,
    Pick<Subscription, "onDeleteClubDevice">
  >;
  onUpdateClub: GeneratedSubscription<
    SubscriptionOnUpdateClubArgs,
    Pick<Subscription, "onUpdateClub">
  >;
}

export const subIdToSubGql: allSubscriptionsI = {
  onCreateClubDevice: subscriptionOnCreateClubDevice,
  onUpdateClubDevice: subscriptionOnUpdateClubDevice,
  onDeleteClubDevice: subscriptionOnDeleteClubDevice,
  onUpdateClub: subscriptionOnUpdateClub,
};
// the boolean is for whether the subscription has ever been active
export type SubscriptionStateType = Record<
  keyof allSubscriptionsI,
  [boolean, string]
>;

const initialState: SubscriptionStateType = Object.keys(subIdToSubGql).reduce<
  Record<keyof allSubscriptionsI, [boolean, string]>
>((acc: SubscriptionStateType, subId: string) => {
  acc[subId as keyof allSubscriptionsI] = [false, "disconnected"];
  return acc;
}, {} as SubscriptionStateType);

export const subscriptionStatesSlice = createSlice({
  name: "subscriptionStates",
  initialState,
  reducers: {
    setSubscriptionStatus: (
      state,
      action: PayloadAction<[keyof allSubscriptionsI, string]>,
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state[action.payload[0]][1] = action.payload[1];
    },
    setSubscriptionBirth: (
      state,
      action: PayloadAction<keyof allSubscriptionsI>,
    ) => {
      state[action.payload][0] = true;
    },
    setBornSubscriptionStatuses: (state, action: PayloadAction<string>) => {
      Object.keys(state).forEach((subId) => {
        if (state[subId as keyof allSubscriptionsI][0] === true) {
          state[subId as keyof allSubscriptionsI][1] = action.payload;
        }
      });
    },
  },
});

export const {
  setSubscriptionStatus,
  setSubscriptionBirth,
  setBornSubscriptionStatuses,
} = subscriptionStatesSlice.actions;

export const selectSubscriptionStateById =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (subId: keyof allSubscriptionsI) => (state: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return state.subscriptionStates[subId];
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectSubscriptionStates = (state: any) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  state.subscriptionStates;

export default subscriptionStatesSlice.reducer;
