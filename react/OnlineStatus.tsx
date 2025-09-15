import type { JSX } from "react";

import type { SubscriptionNames } from "../graphql/subscriptions.js";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog.js";
import { useConnectionHealthy } from "./useConnectionHealthy.js";

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
