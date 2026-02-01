These files are used only to help the IDE understand the graphQL schema; they are located canonically in the bridgefridge-cloud project:

aws-directives.graphql (static)
aws-scalars.graphql (static)
schema.api.graphql (volatile, modify in bridgefridge-cloud)

The typescript types in:

appsync.d.ts

are generated from schema.api.graphql . All of these files are processed and copied into this repo by running `npm run codegen-gql-types` in bridgefridge-cloud.
