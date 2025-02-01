import { MutationUnassignTableArgs } from "../appsync";
import {
  errorForDeviceLevelMultitenancy,
  InputValidator,
} from "./multitenancy";

export const errorForMutationUnassignTable: InputValidator<
  MutationUnassignTableArgs
> = ({ args, cogIdentity }) =>
  errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
  });
