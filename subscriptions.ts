import { GraphQLSubscription } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

import { AuthMode } from "./authMode";
import { Club, ClubDevice } from "./graphql/appsync";
import {
  allSubscriptionsI,
  setSubscriptionStatus,
  subIdToSubGql,
} from "./subscriptionStatesSlice";

const pool: Record<string, unknown> = {};

export type SUBSCRIPTION_CALLBACK_TYPE<T extends keyof allSubscriptionsI> =
  T extends "createdClubDevice"
    ? { createdClubDevice: ClubDevice }
    : T extends "deletedClubDevice"
    ? { deletedClubDevice: ClubDevice }
    : T extends "updatedClub"
    ? { updatedClub: Club }
    : never;

export interface AccessParams {
  dispatch: any;
  clubId: string;
  authMode?: AuthMode;
}

export interface SubscriptionParams<T extends keyof allSubscriptionsI> {
  subId: T;
  callback: (arg0: SUBSCRIPTION_CALLBACK_TYPE<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clubIdVarName?: string;
}

export type TypedSubscriptionParams<T extends keyof allSubscriptionsI> =
  AccessParams & SubscriptionParams<T>;

// unfortunately there's a lot to do for type safety and shortcuts are taken within
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment */
export const typedSubscription = <T extends keyof allSubscriptionsI>({
  subId,
  clubId,
  callback,
  dispatch,
  clubIdVarName,
  authMode,
}: TypedSubscriptionParams<T>) => {
  try {
    deleteSub(dispatch, subId);
    if (!pool[subId]) {
      const variables: Record<string, unknown> = {};
      variables[clubIdVarName || "clubId"] = clubId;

      const gql = subIdToSubGql[subId];
      pool[subId] = API.graphql<
        GraphQLSubscription<SUBSCRIPTION_CALLBACK_TYPE<typeof subId>>
      >({
        authMode: authMode || "AMAZON_COGNITO_USER_POOLS",
        ...graphqlOperation(gql, variables),
      }).subscribe({
        next: (data: any) => {
          callback(data.value.data);
        },
        error: (e) => {
          dispatch(
            setSubscriptionStatus([
              subId,
              `failed post-initialization: ${e.error.errors[0].message}`,
            ]),
          );
        },
      });
    }
    dispatch(setSubscriptionStatus([subId, "successfullySubscribed"]));
  } catch (e: any) {
    if (e.message) {
      dispatch(
        setSubscriptionStatus([
          subId,
          `failed at initialization: ${e.message}`,
        ]),
      );
    } else {
      dispatch(
        setSubscriptionStatus([subId, `failed at initialization: ${e}`]),
      );
    }
    return;
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
    deleteSub(dispatch, subId as keyof allSubscriptionsI /* actually safe */);
  });
};
/* eslint-enable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment */
