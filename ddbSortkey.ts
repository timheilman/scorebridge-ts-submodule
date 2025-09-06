import { allDirections } from "./bridgeEnums";
import { DirectionLetter } from "./graphql/appsync";

// CLUB, below:
export const clubSortKeyPrefix0 = "CLUB";
export const clubDeviceSortKeyPrefix0 = "CDEV";
export const gameSortKeyPrefix0 = "GAME";
// shares slot with PlayerAssignment.directionLetter, so must not be N, S, E, or W:
export const resultSortKeyPrefix3 = "BDRT";
// CLUBHUMAN, below:
export const clubHumanSortKeyPrefix0 = "CLHU";
export const humanSortKeyPrefix0 = "HUMN";
export const cognitoUserSortKeyPrefix0 = "CGID";
export const displayNameSortKeyPrefix0 = "CHDN";

export const clubKey = (clubId: string) => `${clubSortKeyPrefix0}#${clubId}`;
export const clubKeys = (clubId: string) => ({
  pk: clubKey(clubId),
  sk: clubKey(clubId),
});
export const clubIdFromKey = (clubKey: string) => {
  if (!clubKey.startsWith(clubSortKeyPrefix0)) {
    return {
      error: `Not a clubKey; ${clubKey} did not start with ${clubSortKeyPrefix0}`,
      result: "",
    };
  }
  const theSplit = clubKey.split("#");
  if (theSplit.length < 2) {
    return {
      error: `Not a correct clubKey; ${clubKey} has no hashes.`,
      result: "",
    };
  }
  return { result: theSplit[1], error: "" };
};

export const humanKey = (humanId: string) =>
  `${humanSortKeyPrefix0}#${humanId}`;
export const humanKeys = (humanId: string) => ({
  pk: humanKey(humanId),
  sk: humanKey(humanId),
});
export const humanIdFromKey = (humanKey: string) => {
  if (!humanKey.startsWith(humanSortKeyPrefix0)) {
    return {
      error: `Not a humanKey: ${humanKey} did not start with ${humanSortKeyPrefix0}`,
      result: "",
    };
  }
  const theSplit = humanKey.split("#");
  if (theSplit.length < 2) {
    return {
      error: `Not a correct humanKey; ${humanKey} has no hashes.`,
      result: "",
    };
  }
  return { result: theSplit[1], error: "" };
};

export const clubHumanKey = (clubHumanId: string) =>
  `${clubHumanSortKeyPrefix0}#${clubHumanId}`;

export const displayNameKey = (displayName: string) =>
  `${displayNameSortKeyPrefix0}#${displayName}`;

export const cognitoUserIdKey = (cognitoUserId: string) =>
  `${cognitoUserSortKeyPrefix0}#${cognitoUserId}`;
export const cognitoUserIdFromKey = (cognitoUserIdKey: string) => {
  if (!cognitoUserIdKey.startsWith(cognitoUserSortKeyPrefix0)) {
    return {
      error: `Not a cognitoUserIdKey: ${cognitoUserIdKey} did not start with ${cognitoUserSortKeyPrefix0}`,
      result: "",
    };
  }
  const theSplit = cognitoUserIdKey.split("#");
  if (theSplit.length < 2) {
    return {
      error: `Not a correct cognitoUserIdKey; ${cognitoUserIdKey} has no hashes.`,
      result: "",
    };
  }
  return { result: theSplit[1], error: "" };
};
// DATA MODELING OF HUMANS
//
// Common cases:
// 1) preTokenGeneration: need to go from cogntio user id => map of club id to role
// 2) playerAssignment: need to go from club id => list of club player display names
//
// Rare cases:
// 3) mergeIdps: multiple logins created by same user should be mergeable; different cognitoUserIds
// pointing to different humanIds must instead be made to point to the same humanId
// 4) claimRosterEntry: login created by user should be mergeable with roster entry
// created by adminClub; cognitoUserId and clubHumanId pointing to different humanIds must
// instead be made to point to the same humanId

// Thought exercise: traditional RDBMS w/ uniqueness indexes
// Human table
// ----------
// humanId (primary key)
// userPreference1 (not sure what yet)
// userPreference2 (not sure what yet)

// CognitoUser table (join table between "IdentityProvider" and Human)
// ----------------
// cognitoUserId (primary key)
// humanId (foreign key)
// userName
// identityProvider ("Facebook", "Google", "SignInWithApple", "LogInWithAmazon", "CognitoUserPool") (phantom foreign key)
// email
// cross this out: alternate unique key: (humanId, identityProviderName); allow multiple users from one idp for one human
// alternate unique key: (identityProviderName, email)

// ClubHuman table (join table between Club and Human)
// ----------------
// clubId (foreign key)
// humanId (foreign key)
// clubHumanId
// role (e.g. "ownerClub", "adminClub", "memberClub")
// displayName
// composite primary key: (clubId, clubHumanId)
// alternate unique key: (clubId, humanId)
// alternate unique key: (clubId, displayName) (for autocomplete uniqueness at player assignment)

// NationalPlayer table (join table between "NationalOrg" and Human)
// ----------------
// nationalOrg (e.g. "ACBL") (phantom foreign key)
// humanId (foreign key)
// nationalPlayerId
// composite primary key: (nationalOrg, nationalPlayerId)
// alternate unique key: (nationalOrg, humanId)

// Club table
// ----------
// clubId (primary key)
// name
// mostly as FK target for 1:M hierarchy stuff not modeled here: game, playerAssignment, etc.

// now, applying the above to the learnings of adjacency lists, here:
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-adjacency-graphs.html
// how will I achieve those alternate unique keys?  Do I even need to?
// NationalOrg and IdentityProvider are phantom tables

// Human:
// pk: HUMAN#<humanId>, sk: HUMAN#<humanId>, userPreference1: <userPreference1>, ...

// Club:
// pk: CLUB#<clubId>, sk: CLUB#<clubId>, name: <clubName>
// This already exists: CLUB is clubSortKeyPrefix0, although it currently looks like
// pk: <clubId>, sk: CLUB

// NationalPlayer:
// normally this would be
// pk: HUMAN#<humanId>, sk: NATIONALORG#<nationalOrgId>, nationalPlayerId: <nationalPlayerId>
// but that won't get the uniqueness we want on (nationalOrgId, nationalPlayerId)
// We could just punt on this uniqueness for now: allow multiple humans to have the same ACBL#?
// that seems wrong.  The other way to solve this is with a transaction that inserts the
// pk: HUMAN#<humanId>, sk: NATIONALORG#<nationalOrgId>, nationalPlayerId: <nationalPlayerId>
// record and also inserts the
// pk: NATIONALORG#<nationalOrgId>, sk: NATIONALPLAYER#<nationalPlayerId>, humanId: <humanId> record, failing the
// transaction if the second record already exists.

// ClubHuman:
// normally this would be
// pk: HUMAN#<humanId>, sk: CLUB#<clubId>, clubHumanId: <clubHumanId>, role: <role>*, displayName: <displayName>
// but that won't get the uniqueness we want on (clubId, clubHumanId) and (clubId, displayName)
// Gotta do this with a transaction, also inserting:
// pk: CLUB#<clubId>, sk: CLUBHUMAN#<clubHumanId>, humanId: <humanId>
// failing the transaction if it already exists.  (This already exists: CLUBHUMAN is playerSortKeyPrefix0)
// however, use case playerAssignment (see below) causes us to swap the primary and alternate, so:
// pk: CLUB#<clubId>, sk: CLUBHUMAN#<clubHumanId>, humanId: <humanId>, role: <role>*, displayName: <displayName>
// with additional uniqueness enforced by:
// pk: HUMAN#<humanId>, sk: CLUB#<clubId>, clubHumanId: <clubHumanId>
// _if_ displayName is present, then also:
// pk: CLUB#<clubId>, sk: CLUBHUMANDISPLAYNAME#<displayName>, clubHumanId: <clubHumanId>, humanId: <humanId>

// CognitoUser
// normally, would be:
// pk: HUMAN#<humanId>, sk: IDP#<idp>, cognitoUserId, email, givenName, familyName, maybe image?
// but this causes uniqueness, where we don't need it.  Instead, we'll use the first-class entity for cognitoUser::
// pk: HUMAN#<humanId>, sk: COGNITOUSERID#<cognitoUserId>, idp: <idp>, email: <email>, userName, givenName, familyName, maybe image?
// transaction for uniqueness could also insert:
// pk: IDP#<idp>, sk: EMAIL#<email>, humanId: <humanId>, cognitoUserId: <cognitoUserId>
// failing the transaction if it already exists, but it won't because (I think) this is guaranteed
// by the social provider IDPs anyway: no two accounts for the same IDP are allowed to have the same
// email, whether the IDP is social or CognitoUserPool.

// CognitoUserClub
// pk: COGNITOUSERID#<cognitoUserId>, sk: CLUB#<clubId>, clubHumanId: <clubHumanId>, humanId: <humanId>, displayName: <displayName>, role: <role>*
// This is purely an efficiency table. It is redundant, and only re-encodes
// the relationship from Club to HumanClub to Human to CognitoUser, as
// directly the relationship from CognitoUser to Club.  This is to have
// a place to look up clubId, role pairs directly from a cognitoUserId
// during preTokenGeneration without needing >1 ddb query. It must
// be kept in sync (via transaction) with the values on the
// pk: CLUB#<clubId>, sk: CLUBHUMAN#<clubHumanId> table

// Use case 1) preTokenGeneration:
// cognitoUserId => map from clubId to role
// so working backward from the use case, we want:
// pk: COGNITOUSERID#<cognitoUserId>, sk: CLUB#<clubId>, role: <role>
// but the fundamental problem there is that different IDPs could wind up returning different roles for the
// same human in the same club.  roles will be written seldom but read a great deal, so perhaps what
// we do is insert these records additionally, duplicating role data, and use transactions to ensure
// that the role in the pk: CLUB#<clubId>, sk: CLUBHUMAN#<clubHumanId> record is always the same as all roles
// in the corresponding pk: COGNITOUSERID#<cognitoUserId>, sk: CLUB#<clubId> records, linked via the
// pk: HUMAN#<humanId>, sk: COGNITOUSERID#<cognitoUserId> records.
// * thus, the role: <role> value in the pk: CLUB#<clubId>, sk: CLUBHUMAN#<clubHumanId> is the
// canonical value, but not the one read during the preTokenGeneration use case from the
// pk: COGNITOUSERID#<cognitoUserId>, sk: CLUB#<clubId> record

// Use case 2) playerAssignment:
// clubId => list of clubHuman displayNames/ clubMemberIds
// working backward from use case, let's make the "alternate" adjacency list uniqueness record
// become the primary, and what would normally be the primary will be the alternate (see above)

// Use case 3) mergeIdps:
// BEFORE:
// ------
// pk: HUMAN#<humanId1>, sk: HUMAN#<humanId1>, userPreference1: <userPreference1.1>, ...
// pk: HUMAN#<humanId2>, sk: HUMAN#<humanId2>, userPreference1: <userPreference2.1>, ...
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId1>, nationalPlayerId: <nationalPlayerId1>
// pk: HUMAN#<humanId2>, sk: NATIONALORG#<nationalOrgId2>, nationalPlayerId: <nationalPlayerId2>
// pk: NATIONALORG#<nationalOrgId1>, sk: NATIONALPLAYER#<nationalPlayerId1>, humanId: <humanId1>
// pk: NATIONALORG#<nationalOrgId2>, sk: NATIONALPLAYER#<nationalPlayerId2>, humanId: <humanId2>
// pk: CLUB#<clubId1>, sk: CLUBHUMAN#<clubHumanId1>, humanId: <humanId1>, role: <role1>*, displayName: <displayName1>
// pk: CLUB#<clubId1>, sk: CLUBHUMANDISPLAYNAME#<displayName1>, clubHumanId: <clubHumanId1>, humanId: <humanId1>
// pk: CLUB#<clubId2>, sk: CLUBHUMAN#<clubHumanId2>, humanId: <humanId2>, role: <role2>*, displayName: <displayName2>
// pk: CLUB#<clubId2>, sk: CLUBHUMANDISPLAYNAME#<displayName2>, clubHumanId: <clubHumanId2>, humanId: <humanId2>
// pk: HUMAN#<humanId1>, sk: CLUB#<clubId1>, clubHumanId: <clubHumanId1>
// pk: HUMAN#<humanId2>, sk: CLUB#<clubId2>, clubHumanId: <clubHumanId2>
// pk: COGNITOUSERID#<cognitoUserId1>, sk: CLUB#<clubId1>, role: <role1>
// pk: COGNITOUSERID#<cognitoUserId2>, sk: CLUB#<clubId2>, role: <role2>
// pk: IDP#<idp1>, sk: EMAIL#<email1>, humanId: <humanId1>, cognitoUserId: <cognitoUserId1>
// pk: IDP#<idp2>, sk: EMAIL#<email2>, humanId: <humanId2>, cognitoUserId: <cognitoUserId2>
// pk: HUMAN#<humanId1>, sk: COGNITOUSERID#<cognitoUserId1>, idp: <idp1>, email: <email1>, givenName1, familyName1, maybe image1?
// pk: HUMAN#<humanId2>, sk: COGNITOUSERID#<cognitoUserId2>, idp: <idp2>, email: <email2>, givenName1, familyName1, maybe image1?
//
// let d(x1, x2) = x1 === x2 ? x1 : user decision which to keep among x1, x2
// let e(role1, role2) = greater-privileged role among role1, role2
// AFTER:
// -----
// pk: HUMAN#<humanId1>, sk: HUMAN#<humanId1>, userPreference1: d(<userPreference1.1>, <userPreference2.1>), ...

// if d(<nationalOrgId1>, <nationalOrgId2>) !== <nationalOrgId1>:
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId1>, nationalPlayerId: <nationalPlayerId1>
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId2>, nationalPlayerId: <nationalPlayerId2>
// pk: NATIONALORG#<nationalOrgId1>, sk: NATIONALPLAYER#<nationalPlayerId1>, humanId: <humanId1>
// pk: NATIONALORG#<nationalOrgId2>, sk: NATIONALPLAYER#<nationalPlayerId2>, humanId: <humanId1>
// if d(<nationalOrgId1>, <nationalOrgId2>) === <nationalOrgId1>:
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId1>, nationalPlayerId: d(<nationalPlayerId1>, <nationalPlayerId2>)
// pk: NATIONALORG#<nationalOrgId1>, sk: NATIONALPLAYER#d(<nationalPlayerId1>, <nationalPlayerId2>), humanId: <humanId1>

// if d(<clubId1>, <clubId2>) !== <clubId1>
// pk: CLUB#<clubId1>, sk: CLUBHUMAN#<clubHumanId1>, humanId: <humanId1>, role: <role1>*, displayName: <displayName1>
// pk: CLUB#<clubId1>, sk: CLUBHUMANDISPLAYNAME#<displayName1>, clubHumanId: <clubHumanId1>, humanId: <humanId1>
// pk: CLUB#<clubId2>, sk: CLUBHUMAN#<clubHumanId2>, humanId: <humanId1>, role: <role2>*, displayName: <displayName2>
// pk: CLUB#<clubId2>, sk: CLUBHUMANDISPLAYNAME#<displayName2>, clubHumanId: <clubHumanId2>, humanId: <humanId1>
// pk: HUMAN#<humanId1>, sk: CLUB#<clubId1>, clubHumanId: <clubHumanId1>
// pk: HUMAN#<humanId1>, sk: CLUB#<clubId2>, clubHumanId: <clubHumanId2>
// pk: COGNITOUSERID#<cognitoUserId1>, sk: CLUB#<clubId1>, role: <role1>
// pk: COGNITOUSERID#<cognitoUserId2>, sk: CLUB#<clubId2>, role: <role2>
// if d(<clubId1>, <clubId2>) === <clubId1>
// pk: CLUB#<clubId1>, sk: CLUBHUMAN#<clubHumanId1>, humanId: <humanId1>, role: e(<role1>, <role2>)*, displayName: d(<displayName1>, displayName2>)
// pk: CLUB#<clubId1>, sk: CLUBHUMANDISPLAYNAME#d(<displayName1>, displayName2>), clubHumanId: <clubHumanId1>, humanId: <humanId1>
// pk: HUMAN#<humanId1>, sk: CLUB#<clubId1>, clubHumanId: <clubHumanId1>
// pk: COGNITOUSERID#<cognitoUserId1>, sk: CLUB#<clubId1>, role: e(<role1>, <role2>)

// pk: HUMAN#<humanId1>, sk: IDP#<idp1>, cognitoUserId, email, givenName, familyName, maybe image?
// pk: HUMAN#<humanId1>, sk: IDP#<idp2>, cognitoUserId, email, givenName, familyName, maybe image?
// pk: IDP#<idp1>, sk: EMAIL#<email1>, humanId: <humanId1>, cognitoUserId: <cognitoUserId1>
// pk: IDP#<idp2>, sk: EMAIL#<email2>, humanId: <humanId1>, cognitoUserId: <cognitoUserId2>
// pk: HUMAN#<humanId1>, sk: COGNITOUSERID#<cognitoUserId1>, idp: <idp1>, email: <email1>
// pk: HUMAN#<humanId1>, sk: COGNITOUSERID#<cognitoUserId2>, idp: <idp2>, email: <email2>

// Use case 4) claimRosterEntry. (humanId1, owner of clubId1 w/no roster, claiming roster entry humanId2 in clubId2):

// BEFORE:
// ------
// pk: HUMAN#<humanId1>, sk: HUMAN#<humanId1>, userPreference1: <userPreference1.1>, ...
// pk: HUMAN#<humanId2>, sk: HUMAN#<humanId2>, userPreference1: <userPreference2.1>, ...
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId1>, nationalPlayerId: <nationalPlayerId1>
// pk: HUMAN#<humanId2>, sk: NATIONALORG#<nationalOrgId2>, nationalPlayerId: <nationalPlayerId2>
// pk: NATIONALORG#<nationalOrgId1>, sk: NATIONALPLAYER#<nationalPlayerId1>, humanId: <humanId1>
// pk: NATIONALORG#<nationalOrgId2>, sk: NATIONALPLAYER#<nationalPlayerId2>, humanId: <humanId2>
// pk: CLUB#<clubId1>, sk: CLUBHUMAN#<clubHumanId1>, humanId: <humanId1>, role: adminClub*, displayName: <displayName1>
// pk: CLUB#<clubId1>, sk: CLUBHUMANDISPLAYNAME#<displayName1>, clubHumanId: <clubHumanId1>, humanId: <humanId1>
// pk: CLUB#<clubId2>, sk: CLUBHUMAN#<clubHumanId2>, humanId: <humanId2>, role: memberClub*, displayName: <displayName2>
// pk: CLUB#<clubId2>, sk: CLUBHUMANDISPLAYNAME#<displayName2>, clubHumanId: <clubHumanId2>, humanId: <humanId2>
// pk: HUMAN#<humanId1>, sk: CLUB#<clubId1>, clubHumanId: <clubHumanId1>
// pk: HUMAN#<humanId2>, sk: CLUB#<clubId2>, clubHumanId: <clubHumanId2>
// pk: COGNITOUSERID#<cognitoUserId1>, sk: CLUB#<clubId1>, role: adminClub
// pk: IDP#<idp1>, sk: EMAIL#<email1>, humanId: <humanId1>, cognitoUserId: <cognitoUserId1>
// pk: HUMAN#<humanId1>, sk: COGNITOUSERID#<cognitoUserId1>, idp: <idp1>, email: <email1>, givenName1, familyName1, maybe image1?

// AFTER:
// -----
// pk: HUMAN#<humanId1>, sk: HUMAN#<humanId1>, userPreference1: <userPreference1.1>, UserPreference2: <userPreference2.1> ...

// if d(<nationalOrgId1>, <nationalOrgId2>) !== <nationalOrgId1>:
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId1>, nationalPlayerId: <nationalPlayerId1>
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId2>, nationalPlayerId: <nationalPlayerId2>
// pk: NATIONALORG#<nationalOrgId1>, sk: NATIONALPLAYER#<nationalPlayerId1>, humanId: <humanId1>
// pk: NATIONALORG#<nationalOrgId2>, sk: NATIONALPLAYER#<nationalPlayerId2>, humanId: <humanId1>
// if d(<nationalOrgId1>, <nationalOrgId2>) === <nationalOrgId1>:
// pk: HUMAN#<humanId1>, sk: NATIONALORG#<nationalOrgId1>, nationalPlayerId: d(<nationalPlayerId1>, <nationalPlayerId2>)
// pk: NATIONALORG#<nationalOrgId1>, sk: NATIONALPLAYER#d(<nationalPlayerId1>, <nationalPlayerId2>), humanId: <humanId1>

// pk: CLUB#<clubId1>, sk: CLUBHUMAN#<clubHumanId1>, humanId: <humanId1>, role: adminClub*, displayName: <displayName1>
// pk: CLUB#<clubId1>, sk: CLUBHUMANDISPLAYNAME#<displayName1>, clubHumanId: <clubHumanId1>, humanId: <humanId1>
// pk: CLUB#<clubId2>, sk: CLUBHUMAN#<clubHumanId2>, humanId: <humanId1>, role: memberClub*, displayName: <displayName2>
// pk: CLUB#<clubId2>, sk: CLUBHUMANDISPLAYNAME#<displayName2>, clubHumanId: <clubHumanId2>, humanId: <humanId1>
// pk: HUMAN#<humanId1>, sk: CLUB#<clubId1>, clubHumanId: <clubHumanId1>
// pk: HUMAN#<humanId1>, sk: CLUB#<clubId2>, clubHumanId: <clubHumanId2>
// pk: COGNITOUSERID#<cognitoUserId1>, sk: CLUB#<clubId1>, role: adminClub
// pk: COGNITOUSERID#<cognitoUserId1>, sk: CLUB#<clubId2>, role: memberClub
// pk: IDP#<idp1>, sk: EMAIL#<email1>, humanId: <humanId1>, cognitoUserId: <cognitoUserId1>
// pk: HUMAN#<humanId1>, sk: COGNITOUSERID#<cognitoUserId1>, idp: <idp1>, email: <email1>, givenName1, familyName1, maybe image1?

export const clubDeviceIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(clubDeviceSortKeyPrefix0)) {
    return {
      error: `Not a clubDeviceItem sortKey; ${sortKey} did not start with ${clubDeviceSortKeyPrefix0}`,
      result: "",
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, direction
  if (theSplit.length < 2) {
    return {
      error: `Not a correct sortKey; ${sortKey} has no hashes.`,
      result: "",
    };
  }
  return { result: theSplit[1], error: "" };
};

export const directionLetterFromSortKey = (
  sortKey: string,
): { error: string; result: DirectionLetter } => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
      result: "N" as const,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, direction
  if (theSplit.length < 4) {
    return {
      error: `Not a correct sortKey; ${sortKey} has under three hashes.`,
      result: "N" as const,
    };
  }
  const directionString = theSplit[3];
  if (!allDirections.includes(directionString as DirectionLetter)) {
    return {
      error: `Not a correct sortKey; ${directionString} is not a direction.`,
      result: "N" as const,
    };
  }
  return {
    result: directionString as DirectionLetter,
    error: "",
  };
};

export const gameIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId
  if (theSplit.length < 2) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} has no hashes.`,
    };
  }
  return { result: theSplit[1], error: "" };
};

export const clubHumanIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(clubHumanSortKeyPrefix0)) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} did not start with ${clubHumanSortKeyPrefix0}`,
    };
  }
  const theSplit = sortKey.split("#");
  // P, clubHumanId
  if (theSplit.length < 2) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} has no hashes.`,
    };
  }
  // clubHumanIds can (and do) contain hash (#), so must rejoin them:
  return { result: theSplit.slice(1, theSplit.length).join("#"), error: "" };
};

export const tableNumberFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      result: 0,
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber
  if (theSplit.length < 3) {
    return {
      result: 0,
      error: `Not a correct sortKey; ${sortKey} has < 2 hashes.`,
    };
  }
  return { result: +theSplit[2], error: "" };
};

export const boardFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
      result: 0,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, R, boardNumber
  if (theSplit.length < 5) {
    return {
      error: `Not a correct sortKey; ${sortKey} has under four hashes.`,
      result: 0,
    };
  }
  if (theSplit[3] !== resultSortKeyPrefix3) {
    return {
      error: `Not a correct sortKey; ${sortKey[3]} is not resultSortKeyPrefix3: ${resultSortKeyPrefix3}`,
      result: 0,
    };
  }
  return {
    result: +theSplit[4],
    error: "",
  };
};

export const roundFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
      result: 0,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, R, boardNumber, roundNumber
  if (theSplit.length < 6) {
    return {
      error: `Not a correct sortKey; ${sortKey} has under five hashes.`,
      result: 0,
    };
  }
  if (theSplit[3] !== resultSortKeyPrefix3) {
    return {
      error: `Not a correct sortKey; ${sortKey[3]} is not resultSortKeyPrefix3: ${resultSortKeyPrefix3}`,
      result: 0,
    };
  }
  return {
    result: +theSplit[5],
    error: "",
  };
};

export const gameItemSortKeyRegExStr = `^${gameSortKeyPrefix0}#[^#]+$`;

export const tableAssignmentItemSortKeyRegExStr = ({
  gameId = "[^#]+",
}: {
  gameId?: string;
}) => {
  return `^${gameSortKeyPrefix0}#${gameId}#\\d+$`;
};

export const boardResultItemSortKeyRegExStr = ({
  gameId = "[^#]+",
  tableNumber = "[0-9]+",
}: {
  gameId?: string;
  tableNumber?: number | string;
}) => {
  return `^${gameSortKeyPrefix0}#${gameId}#${tableNumber}#${resultSortKeyPrefix3}#[^#]+#[^#]+$`;
};
