import { GraphQLSubscription } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

import {
  allSubscriptionsI,
  setSubscriptionStatus,
  subIdToSubGql,
} from "./subscriptionStatesSlice";

const pool: Record<string, unknown> = {};
export interface TypedSubscriptionParams<CALLBACKTYPE> {
  subId: keyof allSubscriptionsI;
  clubId: string;
  callback: (arg0: CALLBACKTYPE) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appDispatch: any; // see store.ts in both consumers; I don't know how to type this
  clubIdVarName?: string;
}
export const typedSubscription = <CALLBACKTYPE>({
  subId,
  clubId,
  callback,
  appDispatch,
  clubIdVarName,
}: TypedSubscriptionParams<CALLBACKTYPE>) => {
  try {
    deleteSub(appDispatch, subId);
    if (!pool[subId]) {
      const variables: Record<string, unknown> = {};
      variables[clubIdVarName || "clubId"] = clubId;
      pool[subId] = API.graphql<GraphQLSubscription<CALLBACKTYPE>>({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        ...graphqlOperation(subIdToSubGql[subId], variables),
      }).subscribe({
        next: (data) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          callback(data.value?.data);
        },
        error: (e) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          appDispatch(
            setSubscriptionStatus([
              "updatedClub",
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
              `failed post-initialization: ${e.error.errors[0].message}`,
            ]),
          );
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    appDispatch(setSubscriptionStatus([subId, "successfullySubscribed"]));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.message) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      appDispatch(
        setSubscriptionStatus([
          subId,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
          `failed at initialization: ${e.message}`,
        ]),
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      appDispatch(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        setSubscriptionStatus([subId, `failed at initialization: ${e}`]),
      );
    }
    return;
  }
};

const deleteSub = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appDispatch: any,
  subId: keyof allSubscriptionsI,
) => {
  if (pool[subId]) {
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pool[subId].unsubscribe();
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    delete pool[subId];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    appDispatch(setSubscriptionStatus([subId, "disconnected"]));
    return true;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteAllSubs = (appDispatch: any) => {
  Object.keys(subIdToSubGql).forEach((subId: string) => {
    deleteSub(
      appDispatch,
      subId as keyof allSubscriptionsI /* actually safe */,
    );
  });
};
