import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentNode } from "graphql/language";

import {
  subscriptionCreatedClubDevice,
  subscriptionDeletedClubDevice,
  subscriptionUpdatedClub,
  subscriptionUpdatedClubDevice,
} from "./graphql/subscriptions";

export interface allSubscriptionsI {
  createdClubDevice: DocumentNode;
  updatedClubDevice: DocumentNode;
  deletedClubDevice: DocumentNode;
  updatedClub: DocumentNode;
}

export const subIdToSubGql: allSubscriptionsI = {
  createdClubDevice: subscriptionCreatedClubDevice,
  updatedClubDevice: subscriptionUpdatedClubDevice,
  deletedClubDevice: subscriptionDeletedClubDevice,
  updatedClub: subscriptionUpdatedClub,
};
// the boolean is for whether the subscription has ever been active
export type SubscriptionStateType = Record<
  keyof allSubscriptionsI,
  [boolean, string]
>;

const initialState: SubscriptionStateType = Object.keys(subIdToSubGql).reduce<
  Record<keyof allSubscriptionsI, [boolean, string]>
>(
  (acc: SubscriptionStateType, subId: string) => {
    acc[subId as keyof allSubscriptionsI] = [false, "disconnected"];
    return acc;
  },
  <SubscriptionStateType>{},
);

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
