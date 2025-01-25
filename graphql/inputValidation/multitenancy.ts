import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
export interface GqlUtilErrorParams {
  msg: string;
  errorType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorInfo?: any;
}

const getUserDetails = <T>(ctx: Context<T>) => {
  const cogIdentity = ctx.identity as AppSyncIdentityCognito | undefined | null;
  const groups = cogIdentity?.groups ?? [];
  const isAdminSuper = groups.includes("adminSuper");
  const isAdminClub = groups.includes("adminClub");
  const claims = cogIdentity?.claims as Record<string, unknown> | undefined;
  return { cogIdentity, isAdminSuper, isAdminClub, claims };
};

export const errorForClubLevelMultitenancy = <T>(
  ctx: Context<T>,
  clubId: string,
  failureMessage: string,
): GqlUtilErrorParams | undefined => {
  const { cogIdentity, claims, isAdminSuper } = getUserDetails(ctx);
  if (!cogIdentity) {
    return { msg: "No cogIdentity", errorType: "No cogIdentity" };
  }
  if (!claims) {
    return { msg: "No claims", errorType: "No claims" };
  }
  if (isAdminSuper) {
    return;
  }
  if (!clubId) {
    return { msg: "No clubId", errorType: "No clubId" };
  }
  if (clubId !== claims["custom:tenantId"]) {
    return { msg: failureMessage, errorType: "401: Invalid Club Id" };
  }
  return;
};

export const errorForDeviceLevelMultitenancy = <
  T extends { input: { clubId: string; clubDeviceId?: string | null } },
>(
  ctx: Context<T>,
): GqlUtilErrorParams | undefined => {
  const { cogIdentity, claims, isAdminSuper, isAdminClub } =
    getUserDetails(ctx);
  if (!cogIdentity) {
    return { msg: "No cogIdentity", errorType: "No cogIdentity" };
  }
  if (!claims) {
    return { msg: "No claims", errorType: "No claims" };
  }

  if (isAdminSuper) {
    return;
  }

  const clubId = ctx.arguments.input.clubId;
  const clubMultitenancyError = errorForClubLevelMultitenancy(
    ctx,
    clubId,
    "Can only interact with clubDevices within one's own club",
  );
  if (clubMultitenancyError) {
    return clubMultitenancyError;
  }

  if (isAdminClub) {
    return;
  }

  const clubDeviceId = ctx.arguments.input.clubDeviceId;
  if (!clubDeviceId) {
    util.error(
      "Must specify clubDeviceId with non-admin credentials",
      "401: Invalid Club Device Id",
    );
  }

  if (claims.sub && claims.sub === clubDeviceId) {
    return;
  }
  util.error("Can only act on one's own club device", "401: Invalid Club Id");
};
