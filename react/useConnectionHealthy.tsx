import { ConnectionState } from "aws-amplify/api";
import { useSelector } from "react-redux";

import type { SubscriptionNames } from "../graphql/subscriptions.js";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog.js";
import type { SubscriptionStateType } from "./subscriptionStatesSlice.js";
import {
  selectAllConnected,
  selectSubscriptionsConnectionState,
} from "./subscriptionStatesSlice.js";
const log = tsSubmoduleLogFn("react.useConnectionHealthy.");
export const useConnectionHealthy = (subscriptionIds: SubscriptionNames[]) => {
  const allConnected: SubscriptionStateType["connected"] =
    useSelector(selectAllConnected);
  const subscriptionConnectionState: ConnectionState = useSelector(
    selectSubscriptionsConnectionState,
  );
  // SCOR-105: this couldn't be tested using a development build, because
  // interrupting wifi also interrupts the connection with expo server.
  // tested instead with a preview build
  log("subscriptionStates", "debug", {
    allConnected,
    subscriptionConnectionState,
  });
  log("subscriptionIds", "debug", { subscriptionIds });
  const filteredStates = Object.entries(allConnected).filter((arrElt) =>
    subscriptionIds.includes(arrElt[0] as SubscriptionNames),
  );
  log("filteredStates", "debug", { filteredStates });
  if (filteredStates.every((arrElt) => arrElt[1])) {
    log("returningTrue", "debug");
    return true;
  } else {
    return false;
  }
};
