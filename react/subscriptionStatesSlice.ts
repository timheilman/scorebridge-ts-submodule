import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { Subscription } from "../graphql/appsync";
import {
  SubscriptionNames,
  // SubscriptionArgs,
  subscriptionOnCreateClubDevice,
  subscriptionOnDeleteClubDevice,
  subscriptionOnUpdateClub,
  subscriptionOnUpdateClubDevice,
} from "../graphql/subscriptions";

export const subIdToSubGql = {
  onCreateClubDevice: subscriptionOnCreateClubDevice,
  onUpdateClubDevice: subscriptionOnUpdateClubDevice,
  onDeleteClubDevice: subscriptionOnDeleteClubDevice,
  onUpdateClub: subscriptionOnUpdateClub,
} as const;
// the boolean is for whether the subscription has ever been active
export type SubscriptionStateType = Record<
  SubscriptionNames,
  [boolean, string]
>;

const initialState: SubscriptionStateType = Object.keys(subIdToSubGql).reduce<
  Record<SubscriptionNames, [boolean, string]>
>((acc: SubscriptionStateType, subId: string) => {
  acc[subId as SubscriptionNames] = [false, "disconnected"];
  return acc;
}, {} as SubscriptionStateType);

export const subscriptionStatesSlice = createSlice({
  name: "subscriptionStates",
  initialState,
  reducers: {
    setSubscriptionStatus: (
      state,
      action: PayloadAction<[SubscriptionNames, string]>,
    ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state[action.payload[0]][1] = action.payload[1];
    },
    setSubscriptionBirth: (state, action: PayloadAction<SubscriptionNames>) => {
      state[action.payload][0] = true;
    },
    setBornSubscriptionStatuses: (state, action: PayloadAction<string>) => {
      Object.keys(state).forEach((subId) => {
        if (state[subId as SubscriptionNames][0] === true) {
          state[subId as SubscriptionNames][1] = action.payload;
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
  (subId: SubscriptionNames) => (state: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return state.subscriptionStates[subId];
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectSubscriptionStates = (state: any) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  state.subscriptionStates;

export default subscriptionStatesSlice.reducer;
