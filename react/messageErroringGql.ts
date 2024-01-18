import { client } from "./gqlClient";

export const messageErroringGql = async <
  FALLBACK_TYPES,
  TYPED_GQL_STRING extends string,
>(
  options: Parameters<
    typeof client.graphql<FALLBACK_TYPES, TYPED_GQL_STRING>
  >[0],
  additionalHeaders: Parameters<
    typeof client.graphql<FALLBACK_TYPES, TYPED_GQL_STRING>
  >[1] = undefined,
) => {
  try {
    return await client.graphql(options, additionalHeaders);
  } catch (e) {
    if ((e as { errors: unknown[] }).errors) {
      throw new Error(
        JSON.stringify((e as { errors: unknown[] }).errors, null, 2),
      );
    }
    throw e;
  }
};
