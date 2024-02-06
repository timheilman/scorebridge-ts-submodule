import { Dispatch } from "@reduxjs/toolkit";
import { CONNECTION_STATE_CHANGE, ConnectionState } from "aws-amplify/api";
import { Hub } from "aws-amplify/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Subscription } from "../graphql/appsync";
import {
  KeyedGeneratedSubscription,
  subIdToSubGql,
  SubscriptionNames,
} from "../graphql/subscriptions";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import { client } from "./gqlClient";
import { setSubscriptionStatus } from "./subscriptionStatesSlice";

const log = tsSubmoduleLogFn("subscriptions.");

export type GraphQLAuthMode =
  | "apiKey"
  // | "oidc"
  // | "iam"
  // | "lambda"
  // | "none"
  | "userPool";
const pool: Record<
  string,
  Record<SubscriptionNames, { unsubscribe: () => void }>
> = {};
const statuses: Record<string, Record<string, boolean>> = {};
export interface AccessParams {
  dispatch: Dispatch;
  authMode?: GraphQLAuthMode;
}

export function handleAmplifySubscriptionError(
  dispatch: Dispatch,
  subId: SubscriptionNames,
) {
  log("handleAmplifySubscriptionError", "debug", { subId });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e?.errors?.length && e.errors[0].message) {
      log("handleAmplifySubscriptionError.message", "error", {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        message: e.errors[0].message,
      });
      dispatch(
        setSubscriptionStatus([
          subId,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `failed post-init w/message: ${e.errors[0].message}`,
        ]),
      );
      return;
    }
    log("handleAmplifySubscriptionError.unexpected", "error", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: e,
    });
    dispatch(
      setSubscriptionStatus([
        subId,
        `failed post-init w/o message: ${JSON.stringify(e, null, 2)}`,
      ]),
    );
  };
}

export function handleUnexpectedSubscriptionError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: any,
  dispatch: Dispatch,
  subId: SubscriptionNames,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  log("handleUnexpectedSubscriptionError", "error", { subId, e });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (e.message) {
    dispatch(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setSubscriptionStatus([subId, `failed at init w/message: ${e.message}`]),
    );
  } else {
    dispatch(
      setSubscriptionStatus([subId, `failed at init w/o message: ${e}`]),
    );
  }
  return;
}

export const deleteSub = ({
  dispatch,
  componentName,
  subId,
}: {
  dispatch: Dispatch;
  componentName: string;
  subId: SubscriptionNames;
}) => {
  if (pool[componentName]) {
    if (pool[componentName][subId]) {
      pool[componentName][subId].unsubscribe();
      delete pool[componentName][subId];
      dispatch(setSubscriptionStatus([subId, "disconnected"]));
      return true;
    }
  }
};
export const deleteAllSubs = ({
  componentName,
  dispatch,
}: {
  componentName: string;
  dispatch: Dispatch;
}) => {
  if (pool[componentName]) {
    Object.keys(pool[componentName]).forEach((subId: string) => {
      log("deleteAllSubs", "debug", { subId });
      deleteSub({ dispatch, componentName, subId: subId as SubscriptionNames });
    });
  }
  delete pool[componentName];
};

export type OutType<T> = T extends KeyedGeneratedSubscription<
  infer NAME,
  unknown
>
  ? NeverEmpty<Pick<Subscription, NAME>>[NAME]
  : never;

// these next three types are pulled from AWS Amplify v6 source code
// For why these are copied-into this repo, see
// https://stackoverflow.com/questions/77783165/how-do-i-write-a-type-safe-function-signature-accepting-the-callback-function-fo
type NeverEmpty<T> = {
  [K in keyof T]-?: Exclude<WithListsFixed<T[K]>, undefined | null>;
};
type WithListsFixed<T> = T extends PagedList<infer IT, infer NAME>
  ? PagedList<Exclude<IT, null | undefined>, NAME>
  : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends {}
    ? {
        [K in keyof T]: WithListsFixed<T[K]>;
      }
    : T;
interface PagedList<T, TYPENAME> {
  __typename: TYPENAME;
  nextToken?: string | null | undefined;
  items: T[];
}

export const errorCatchingSubscription = <
  SUB_NAME extends SubscriptionNames,
  INPUT_TYPE,
>({
  accessParams,
  query,
  variables,
  callback,
  componentName,
}: {
  accessParams: AccessParams;
  query: KeyedGeneratedSubscription<SUB_NAME, INPUT_TYPE>;
  variables: INPUT_TYPE;
  callback: (d: OutType<typeof query>) => void;
  componentName: string;
}) => {
  const subId = query.__subscriptionName;
  try {
    deleteSub({ dispatch: accessParams.dispatch, subId, componentName });
    log("errorCatchingSubscription", "debug", {
      subscriptionName: subId,
      ...variables,
    });
    const graphqlResponse = client.graphql({
      authMode: accessParams.authMode ?? "userPool",
      query: query.gql,
      variables,
    });
    pool[componentName][subId] = graphqlResponse.subscribe({
      next: (gqlSubMsg) => callback(gqlSubMsg.data[subId]),
      error: handleAmplifySubscriptionError(accessParams.dispatch, subId),
    });
    log("errorCatchingSubscription.ok", "debug", { subId });
  } catch (e: unknown) {
    handleUnexpectedSubscriptionError(e, accessParams.dispatch, subId);
  }
};

export interface UseSubscriptionsParams {
  componentName: string;
  subscribeToAll: () => void;
  fetchRecentData: () => Promise<void>;
  subscriptionNames: SubscriptionNames[];
}

function normalizeQueryString(unnormalizedQueryString: string) {
  return unnormalizedQueryString.replace(/\s+/g, " ").trim();
}

function subIdFromQueryString(queryString: string) {
  return Object.entries(subIdToSubGql).find(
    (entry) => normalizeQueryString(entry[1].gql) === queryString,
  )![0];
}
const initStatuses = (subscriptionNames: SubscriptionNames[]) => {
  return subscriptionNames.reduce(
    (acc, name) => {
      acc[normalizeQueryString(subIdToSubGql[name].gql)] = false;
      return acc;
    },
    {} as Record<string, boolean>,
  );
};
// TODO: turning off-and-on wifi at the tablet works to turn the icon to red, then back to green
// however, unplugging the router turns it red but plugging it back in never brings it back to green
// I should test this in the webapp in both ways to see if I can reproduce same behavior there

export function useSubscriptions({
  componentName,
  subscribeToAll,
  fetchRecentData,
  subscriptionNames,
}: UseSubscriptionsParams) {
  const dispatch = useDispatch();
  pool[componentName] = {} as Record<
    SubscriptionNames,
    { unsubscribe: () => void }
  >;

  statuses[componentName] = initStatuses(subscriptionNames);
  useEffect(() => {
    subscribeToAll();

    const stopListening = Hub.listen<{
      event: string;
      data: { query: string; connectionState: ConnectionState };
    }>("api", (data) => {
      log("hub.listen.channelApi.callback", "debug", {
        data,
        dataPayloadData: data.payload.data,
      });
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState;
        if (
          connectionState === ConnectionState.ConnectedPendingNetwork ||
          connectionState === ConnectionState.ConnectionDisrupted ||
          connectionState ===
            ConnectionState.ConnectionDisruptedPendingNetwork ||
          connectionState === ConnectionState.Disconnected
        ) {
          statuses[componentName] = initStatuses(subscriptionNames);
          subscriptionNames.forEach((subId) => {
            dispatch(setSubscriptionStatus([subId, connectionState]));
          });
        }
      }
      if (payload.event === "Subscription ack") {
        log("hub.listen.channelApi.subscriptionCallback", "debug", {
          payloadData: payload.data,
        });
        const queryString = normalizeQueryString(payload.data.query);
        // If this copy of the listener is responsible for this update:
        if (statuses[componentName][queryString] !== undefined) {
          log("hub.listen.channelApi.postQueryExtraction", "debug", {
            queryString,
            statuses: statuses[componentName],
          });
          // set this subscription healthy:
          statuses[componentName][queryString] = true;
          const subId = subIdFromQueryString(queryString);
          // notify redux
          dispatch(
            setSubscriptionStatus([
              subId as SubscriptionNames,
              "successfullySubscribed",
            ]),
          );
          // if this was the last subscription marked healthy, (re)fetch data:
          if (
            Object.entries(statuses[componentName]).every((entry) => entry[1])
          ) {
            void fetchRecentData();
          }
        }
      }
    });
    return () => {
      deleteAllSubs({ componentName, dispatch });
      stopListening();
    };
  }, [
    componentName,
    dispatch,
    fetchRecentData,
    subscribeToAll,
    subscriptionNames,
  ]);
}
