import { GraphQLSubscription } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

import { Club, ClubDevice } from "./graphql/appsync";
import {
  allSubscriptionsI,
  setSubscriptionStatus,
  subIdToSubGql,
} from "./subscriptionStatesSlice";

const pool: Record<string, unknown> = {};

type SUBSCRIPTION_CALLBACK_TYPE<T extends keyof allSubscriptionsI> =
  T extends "createdClubDevice"
    ? { createdClubDevice: ClubDevice }
    : T extends "deletedClubDevice"
    ? { deletedClubDevice: ClubDevice }
    : T extends "updatedClub"
    ? { updatedClub: Club }
    : never;
export interface TypedSubscriptionParams<T extends keyof allSubscriptionsI> {
  subId: T;
  clubId: string;
  callback: (arg0: SUBSCRIPTION_CALLBACK_TYPE<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appDispatch: any;
  clubIdVarName?: string;
}

// unfortunately there's a lot to do for type safety and shortcuts are taken within
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment */
export const typedSubscription = <T extends keyof allSubscriptionsI>({
  subId,
  clubId,
  callback,
  appDispatch,
  clubIdVarName,
}: TypedSubscriptionParams<T>) => {
  try {
    deleteSub(appDispatch, subId);
    if (!pool[subId]) {
      const variables: Record<string, unknown> = {};
      variables[clubIdVarName || "clubId"] = clubId;

      pool[subId] = API.graphql<
        GraphQLSubscription<SUBSCRIPTION_CALLBACK_TYPE<typeof subId>>
      >({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        ...graphqlOperation(subIdToSubGql[subId], variables),
      }).subscribe({
        next: (data: any) => {
          callback(data.value.data);
        },
        error: (e) => {
          appDispatch(
            setSubscriptionStatus([
              "updatedClub",
              `failed post-initialization: ${e.error.errors[0].message}`,
            ]),
          );
        },
      });
    }
    appDispatch(setSubscriptionStatus([subId, "successfullySubscribed"]));
  } catch (e: any) {
    if (e.message) {
      appDispatch(
        setSubscriptionStatus([
          subId,
          `failed at initialization: ${e.message}`,
        ]),
      );
    } else {
      appDispatch(
        setSubscriptionStatus([subId, `failed at initialization: ${e}`]),
      );
    }
    return;
  }
};

const deleteSub = (appDispatch: any, subId: keyof allSubscriptionsI) => {
  if (pool[subId]) {
    // @ts-ignore
    pool[subId].unsubscribe();
    delete pool[subId];
    appDispatch(setSubscriptionStatus([subId, "disconnected"]));
    return true;
  }
};
export const deleteAllSubs = (appDispatch: any) => {
  Object.keys(subIdToSubGql).forEach((subId: string) => {
    deleteSub(
      appDispatch,
      subId as keyof allSubscriptionsI /* actually safe */,
    );
  });
};
/* eslint-enable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment */
