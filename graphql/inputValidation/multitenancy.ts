export interface GqlUtilErrorParams {
  msg: string;
  errorType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorInfo?: any;
}

export type PotentialCogIdentity =
  | {
      claims: Record<string, unknown> | undefined;
      groups: string[] | null;
    }
  | undefined;

export const errorForClubLevelMultitenancy = ({
  cogIdentity,
  clubId,
  failureMessage,
}: {
  cogIdentity: PotentialCogIdentity;
  clubId: string;
  failureMessage: string;
}): GqlUtilErrorParams | undefined => {
  if (!cogIdentity) {
    return { msg: "No cogIdentity", errorType: "No cogIdentity" };
  }
  const { claims, groups } = cogIdentity;
  if (!claims) {
    return { msg: "No claims", errorType: "No claims" };
  }
  if ((groups ?? []).includes("adminSuper")) {
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
  clubId,
  clubDeviceId,
}: {
  cogIdentity: PotentialCogIdentity;
  clubId: string;
  clubDeviceId?: string;
}): GqlUtilErrorParams | undefined => {
  if (!cogIdentity) {
    return { msg: "No cogIdentity", errorType: "No cogIdentity" };
  }
  const { claims, groups } = cogIdentity;
  if (!claims) {
    return { msg: "No claims", errorType: "No claims" };
  }

  if ((groups ?? []).includes("adminSuper")) {
    return;
  }

  const clubMultitenancyError = errorForClubLevelMultitenancy({
    cogIdentity,
    clubId,
    failureMessage: `Can only interact with clubDevices within one's own club. ClubId arg: ${clubId}; your clubId: ${claims["custom:tenantId"] as string}`,
  });
  if (clubMultitenancyError) {
    return clubMultitenancyError;
  }

  if ((groups ?? []).includes("adminClub")) {
    return;
  }

  if (!clubDeviceId) {
    return {
      msg: "Must specify clubDeviceId with non-admin credentials",
      errorType: "401: Invalid Club Device Id",
    };
  }

  if (claims.sub && claims.sub === clubDeviceId) {
    return;
  }
  return {
    msg: "Can only act on one's own club device",
    errorType: "401: Invalid Club Id",
  };
};
