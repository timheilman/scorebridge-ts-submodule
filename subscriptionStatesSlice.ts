import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentNode } from "graphql/language";

import { RootState } from "../utils/store";
import {
  subscriptionCreatedClubDevice,
  subscriptionDeletedClubDevice,
  subscriptionUpdatedClub,
} from "./graphql/subscriptions";

export interface allSubscriptionsI {
  createdClubDevice: DocumentNode;
  deletedClubDevice: DocumentNode;
  updatedClub: DocumentNode;
}

export const subIdToSubGql: allSubscriptionsI = {
  createdClubDevice: subscriptionCreatedClubDevice,
  deletedClubDevice: subscriptionDeletedClubDevice,
  updatedClub: subscriptionUpdatedClub,
};
export interface SubscriptionsState {
  value: Record<string, string>;
}

const initialState: SubscriptionsState = {
  value: Object.keys(subIdToSubGql).reduce(
    (acc: Record<string, string>, subId) => {
      acc[subId] = "disconnected";
      return acc;
    },
    {},
  ),
};

export const subscriptionStatesSlice = createSlice({
  name: "subscriptions",
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
      state.value[action.payload[0]] = action.payload[1];
    },
  },
});

export const { setSubscriptionStatus } = subscriptionStatesSlice.actions;

export const selectSubscriptionStateById =
  (subId: keyof allSubscriptionsI) => (state: RootState) =>
    state.subscriptionStates.value[subId];

export default subscriptionStatesSlice.reducer;
