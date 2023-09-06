import {
  allSubscriptionsI,
  setSubscriptionStatus,
} from "../features/subscriptions/subscriptionsSlice";
import { logFn } from "../lib/logging";
const log = logFn("scorebridge-ts-module.subscriptions");

export const deleteSub = (
  subscriptions: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any,
  subId: keyof allSubscriptionsI,
) => {
  if (subscriptions[subId]) {
    log("deleteSub.foundSubId", "debug", { subId });
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    subscriptions[subId].unsubscribe();
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    delete subscriptions[subId];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(setSubscriptionStatus([subId, "disconnected"]));
  }
  log("deleteSub.noSuchSubId", "debug", { subId });
};
