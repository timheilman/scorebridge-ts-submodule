import { JSX } from "react";
import { useSelector } from "react-redux";

import { SubscriptionNames } from "../graphql/subscriptions";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import {
  selectSubscriptionStates,
  SubscriptionStateType,
} from "./subscriptionStatesSlice";

const log = tsSubmoduleLogFn("OnlineStatus.");

export interface OnlineStatusProps {
  subscriptionIds: SubscriptionNames[];
  upIcon: JSX.Element;
  downIcon: JSX.Element;
}

export default function OnlineStatus({
  subscriptionIds,
  upIcon,
  downIcon,
}: OnlineStatusProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const subscriptionStates: SubscriptionStateType = useSelector(
    selectSubscriptionStates,
  );
  // SCOR-105: this couldn't be tested using a development build, because
  // interrupting wifi also interrupts the connection with expo server.
  // tested instead with a preview build
  log("subscriptionStates", "debug", {
    subscriptionsStates: subscriptionStates,
  });
  log("subscriptionIds", "debug", { subscriptionIds });
  const filteredStates = Object.entries(subscriptionStates).filter((arrElt) =>
    subscriptionIds.includes(arrElt[0] as SubscriptionNames),
  );
  log("filteredStates", "debug", { filteredStates });
  if (
    filteredStates.every((arrElt) => {
      return arrElt[1] === "successfullySubscribed";
    })
  ) {
    log("returningUpIcon", "debug");
    return <>{upIcon}</>;
  } else {
    log("returningDownIcon", "debug");
    return <>{downIcon}</>;
  }
}
