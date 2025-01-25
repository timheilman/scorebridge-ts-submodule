export interface GqlUtilErrorParams {
  msg: string;
  errorType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorInfo?: any;
}

export const errorForClubLevelMultitenancy = ({
  cogIdentity,
  claims,
  isAdminSuper,
  clubId,
  failureMessage,
}: {
  cogIdentity: unknown;
  claims: Record<string, unknown> | undefined;
  isAdminSuper: boolean;
  clubId: string;
  failureMessage: string;
}): GqlUtilErrorParams | undefined => {
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

export const errorForDeviceLevelMultitenancy = ({
  cogIdentity,
  claims,
  isAdminSuper,
  isAdminClub,
  clubId,
  clubDeviceId,
}: {
  cogIdentity: unknown;
  claims: Record<string, unknown> | undefined;
  isAdminSuper: boolean;
  isAdminClub: boolean;
  clubId: string;
  clubDeviceId?: string;
}): GqlUtilErrorParams | undefined => {
  if (!cogIdentity) {
    return { msg: "No cogIdentity", errorType: "No cogIdentity" };
  }
  if (!claims) {
    return { msg: "No claims", errorType: "No claims" };
  }

  if (isAdminSuper) {
    return;
  }

  const clubMultitenancyError = errorForClubLevelMultitenancy({
    cogIdentity,
    claims,
    isAdminSuper,
    clubId,
    failureMessage: `Can only interact with clubDevices within one's own club. ClubId arg: ${clubId}; your clubId: ${claims["custom:tenantId"] as string}`,
  });
  if (clubMultitenancyError) {
    return clubMultitenancyError;
  }

  if (isAdminClub) {
    return;
  }

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
