The reason this code is in the shared submodule is that the react-native/testing-library tests
in the device repo use the MSW library to mock the cloud graphql interface, and so should
exhibit the same behavior as the request mapping template input validation.

This code must function both in the AWS AppSync mapping template JS runtime and in the react-native
runtime.
TODO: finally, this is ready for eslint 9, so apply it both to the cloud mapping templates dir, and here, and to bridgeEnums:
https://www.npmjs.com/package/@aws-appsync/eslint-plugin
