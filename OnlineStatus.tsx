// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";

import {
  selectSubscriptionStates,
  SubscriptionStateType,
} from "./subscriptionStatesSlice";

export default function OnlineStatus() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const subscriptionsStates: SubscriptionStateType = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    selectSubscriptionStates,
  );
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.entries(subscriptionsStates).every((arrElt) => {
      return arrElt[1][1] === "successfullySubscribed";
    })
  ) {
    return <FeatherIcon icon="wifi" />;
  } else {
    return <FeatherIcon icon="wifi-off" />;
  }
}
