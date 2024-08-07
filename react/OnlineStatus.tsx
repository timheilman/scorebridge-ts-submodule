import { JSX } from "react";

import { SubscriptionNames } from "../graphql/subscriptions";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import { useConnectionHealthy } from "./useConnectionHealthy";

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
  const connectionHealthy = useConnectionHealthy(subscriptionIds);

  if (connectionHealthy) {
    log("returningUpIcon", "debug");
    return <>{upIcon}</>;
  } else {
    log("returningDownIcon", "debug");
    return <>{downIcon}</>;
  }
}
