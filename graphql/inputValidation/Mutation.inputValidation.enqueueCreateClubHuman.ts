import { MutationEnqueueCreateClubHumanArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationEnqueueCreateClubHuman: InputValidator<
  MutationEnqueueCreateClubHumanArgs
> = ({ args, cogIdentity }) => {
  const multitenancyError = errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only create clubHumans for one's own club.",
  });
  if (multitenancyError) {
    return multitenancyError;
  }
  const { clubId, clubHumanId, clubHumanDisplayName } = args.input;

  if (
    !clubId ||
    (clubHumanId !== null &&
      clubHumanId !== undefined &&
      clubHumanId.trim() === "") ||
    (clubHumanDisplayName !== null &&
      clubHumanDisplayName !== undefined &&
      clubHumanDisplayName.trim() === "")
  ) {
    return {
      msg: "Invalid clubHuman parameters: clubId is required, and clubHumanId and clubHumanDisplayName are optional but if present, must not be empty or whitespace",
      errorType: "400: Invalid clubHuman parameters",
    };
  }
  return;
};
