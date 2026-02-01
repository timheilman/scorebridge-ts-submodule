<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [BridgeFridge](#bridgefridge)
  - [Background](#background)
  - [The Four Code Repositories](#the-four-code-repositories)
    - [bridgefridge-ts-submodule](#bridgefridge-ts-submodule)
    - [bridgefridge-device](#bridgefridge-device)
    - [bridgefridge-cloud](#bridgefridge-cloud)
  - [Identities and Environments](#identities-and-environments)
    - [Services, AWS subaccounts, and Stages/Environments](#services-aws-subaccounts-and-stagesenvironments)
    - [AWS IAM Identity Center, SSO, and the CLI](#aws-iam-identity-center-sso-and-the-cli)
    - [Expected env vars for your CLI](#expected-env-vars-for-your-cli)
    - [bridgefridge-cloud informing webapp and device of env-specific values](#bridgefridge-cloud-informing-webapp-and-device-of-env-specific-values)
  - [This submodule should be an NPM package](#this-submodule-should-be-an-npm-package)
- [RELEASE NOTES](#release-notes)
  - [1.0.0, Version Code 12](#100-version-code-12)

<!-- TOC end -->

## BridgeFridge

### Background

In Portland, Oregon, USA there is a [duplicate bridge](https://en.wikipedia.org/wiki/Duplicate_bridge) [club](https://www.facebook.com/groups/394839073989383) run by a guy named Zack. It is not sanctioned by the [ACBL](https://acbl.org/) and Zack charges no dues – it's purely social and for-fun. I (Tim aka tdh) am a club member. Different club members take turns hosting the game at their homes.

Presently we use Google sheets and extensive macros that Zack has written in them to score the games. However, it is awkward and error-prone using Google Sheets to enter player identities and scores so I undertook this project to make things easier and less error-prone.

### The Four Code Repositories

The project is in three parts:

#### bridgefridge-ts-submodule

This TypeScript [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) is consumed by the two others. Code moves here when it is needed from both other repositories. The following documentation is presented here because parts of it apply to both other repositories.

#### bridgefridge-device

The [Expo app](https://github.com/timheilman/bridgefridge-device) is a React Native app that runs on iOS, Android, and the web. The app has two modes: "club device mode" and "personal device mode." Distribution of the device app is done using the Google Play Store, for now in "internal testing". Eventually generally-available distribution through the Google Play Store and Apple App Store is the target.

##### Web App

The web app is served at https://www.bridgefridge.com/ by the continuous integration/continuous deployment (CI/CD) facility provided by AWS Amplify Frontend Hosting. Although AWS Amplify also offers a backend hosting facility, we do not use it preferring instead to use the CDK framework as described in bridgefridge-cloud, below. The Web App serves personal device mode only.

##### Personal Device Mode

Authentication in this mode is performed using an email and password. The club admin (Zack) uses the Expo app in "personal device" mode, or on the web, to administer the game.

##### Club Device Mode

Club Device Mode is available only when the Expo app is running on a phone or tablet. Authentication in this mode is performed using OAuth 2.0 Device Authorization Flow, as registered by a club admin. Players use the Expo app in this mode to enter identities and scores.

#### bridgefridge-cloud

The [cloud backend](https://github.com/timheilman/bridgefridge-cloud) is built and deployed using the [AWS CDK](https://aws.amazon.com/cdk/) framework. It coordinates the different instances of bridgefridge-device on devices and on the web. It uses AWS AppSync, Cognito, DynamoDB, and Lambda, among other services. It is NOT hosted by the CI/CD facility provided by AWS Amplify Backend Hosting; instead it is hosted on AWS by the CDK framework.

### Identities and Environments

Two separate systems are used for identity management in this project. For the identities of developers on the project, we use the AWS IAM Identity Center. (For the identities of club admins and their club devices, we use AWS Cognito; see bridgefridge-cloud for more information.) Although this part regarding developer identities is a bear, it is the best practice currently recommended for AWS CDK projects.

#### Services, AWS subaccounts, and Stages/Environments

In the serverless NPM framework, each "stage" or "environment" (these terms are synonymous) of bridgefridge-device and bridgefridge-cloud are hosted under differing AWS subaccounts of a root AWS account. (These AWS subaccounts can host multiple environments, but each environment is only within a single AWS subaccount.)

All this is done to provide isolation between environments. For example, the production environment for both bridgefridge-device as a webapp and bridgefridge-cloud is hosted under one AWS account; the development environment is hosted under another.

Each AWS subaccount is administered beneath a root AWS account, using AWS Organizations.

#### AWS IAM Identity Center, SSO, and the CLI

The AWS IAM Identity Center (previously known as AWS Single-Sign-On and still called `aws sso` on the AWS CLI) instance is associated with the root account of the project. The root account/subaccount relationship is managed in AWS Organizations. Permission sets provide differential access for those AWS IAM Identity Center accounts to each of the AWS subaccounts beneath the root account, associated with each NPM serverless framework service.

Each developer on the project will need an account in AWS IAM Identity Center. This is not the same as an IAM account. Instead, AWS IAM Identity Center acts as the Identity Provider (IdP) for IAM. As such, there is an [SSO signin URL for the bridgefridge Identity Center](https://d-92674207af.awsapps.com/start) that is separate from the general AWS signin page for AWS IAM (NOT-IdentityCenter) accounts. (If you fork this project to run your own instance of this project, you will need to create your own AWS IAM Identity Center instance and signin URL.)

Your AWS Identity Center account is the one that you use to [configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) for build, deployment, and testing of bridgefridge-webapp and bridgefridge-cloud. Once you have a profile in the AWS CLI configuration file for a particular env and permission set (using `aws configure sso`), you will need to update it with an extra line. Proceeding from here by example is probably clearest. The extra line begins with `credential_process` in the following example `~/.aws/config` file:

```
[profile BridgeFridge-sbc00-tdh-PowerUser-profile]
sso_session = BridgeFridge-sbc00-tdh-PowerUser-session
sso_account_id = 437893194722
sso_role_name = PowerUserAccess
region = us-west-2
output = json
credential_process = aws configure export-credentials --profile BridgeFridge-sbc00-tdh-PowerUser-profile
[sso-session BridgeFridge-sbc00-tdh-PowerUser-session]
sso_start_url = https://d-92674207af.awsapps.com/start
sso_region = us-west-2
sso_registration_scopes = sso:account:access
```

In this example profile and session, `sbc00` corresponds to the NPM serverless framework service name. It is kept short because AWS lambdas deployed by the NPM serverless framework are automatically named using both the NPM serverless framework service name _and_ the environment name, since a single NPM serverless framework service (and thus, AWS subaccount) can host multiple environments. `PowerUser` corresponds to the AWS IAM Identity Center permissions set. `437893194722` is the AWS account number of the AWS subaccount, corresponding to the NPM serverless service `sbc00`, that hosts the `dev` and `tmpenv` environments. `https://d-92674207af.awsapps.com/start` is the SSO start URL provided by bridgefridge's root account AWS IAM Identity Center instance. `us-west-2` is the AWS region in which the environments are hosted. `tdh` refers to my own AWS IAM Identity Center account.

#### Expected env vars for your CLI

Once you have an AWS SSO profile set up, this project expects these env vars to be set:

```zsh
export BF_STAGE_AWS_CLI_PROFILE=BridgeFridge-dev-tdh-PowerUser-profile
export BF_DNS_AWS_CLI_PROFILE=BridgeFridge-prod-tdh-PowerUser-profile
export STAGE=tdh
export AWS_REGION=us-west-2
```

This tells the build and test code in bridgefridge-cloud and bridgefridge-device which AWS SSO profile to use for the build, deploy, and test. Switching which AWS subaccount you are pointed at is done by switching this env var to a different AWS SSO profile (TODO: [SCOR-588](https://theilman.atlassian.net/browse/SCOR-588) there is a plan to redo this). Within that service/account which env you are pointed at is done by setting the `STAGE` env var to the name of that env. See the `package.json` file in bridgefridge-cloud for more information.

#### bridgefridge-cloud and bridgefridge-device webapp deployments

Once things are set up, a typical deployment and test of bridgefridge-cloud and bridgefridge-device in the dev environment will look like this:

```
bridgefridge-cloud% npm run deploy
bridgefridge-cloud% npm run test
bridgefridge-cloud% cd ../bridgefridge-device
bridgefridge-device% npm start
```

And in a separate terminal:

```
bridgefridge-device% npm test
bridgefridge-device% npm run cypress:run
```

Then, to run the app:

- On android or iOS, launch a development build of the app and point it at the dev server started via npm start.

The app should launch and run.

### This submodule should be an NPM package

Ideally this submodule would be an NPM package. However, at this stage in development this repo is still so volatile that the overhead of publishing and consuming an NPM package is not worth it. When the repo stabilizes, it should be converted to an NPM package.
