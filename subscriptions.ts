import {
  allSubscriptionsI,
  setSubscriptionStatus,
} from "./subscriptionStatesSlice";

export const deleteSub = <T>(
  subscriptions: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any,
  subId: keyof allSubscriptionsI,
  log: (catSuffix: string, logLevel: T, ...addlParams: unknown[]) => void,
  logLevel: T,
) => {
  if (subscriptions[subId]) {
    log("deleteSub.foundSubId", logLevel, { subId });
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscriptions[subId].unsubscribe();
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    delete subscriptions[subId];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(setSubscriptionStatus([subId, "disconnected"]));
  }
  log("deleteSub.noSuchSubId", logLevel, { subId });
};
