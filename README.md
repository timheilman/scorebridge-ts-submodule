<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [ScoreBridge](#scorebridge)
   * [Background](#background)
   * [The Four Code Repositories](#the-four-code-repositories)
      + [scorebridge-ts-submodule](#scorebridge-ts-submodule)
      + [scorebridge-webapp](#scorebridge-webapp)
      + [scorebridge-device](#scorebridge-device)
      + [scorebridge-cloud](#scorebridge-cloud)
   * [Identities and Environments](#identities-and-environments)
      + [Services, AWS subaccounts, and Stages/Environments](#services-aws-subaccounts-and-stagesenvironments)
      + [AWS IAM Identity Center, SSO, and the CLI](#aws-iam-identity-center-sso-and-the-cli)
      + [Expected env vars for your CLI](#expected-env-vars-for-your-cli)
      + [scorebridge-cloud informing webapp and device of env-specific values](#scorebridge-cloud-informing-webapp-and-device-of-env-specific-values)
   * [This submodule should be an NPM package](#this-submodule-should-be-an-npm-package)

<!-- TOC end -->

## ScoreBridge

### Background

In Portland, Oregon, USA there is a [duplicate bridge](https://en.wikipedia.org/wiki/Duplicate_bridge) [club](https://www.facebook.com/groups/394839073989383) run by a guy named Zack.  It is not sanctioned by the [ACBL](https://acbl.org/) and Zack charges no dues – it's purely social and for-fun.  I (Tim aka tdh) am a club member.  Different club members take turns hosting the game at their homes.

Presently we use Google sheets and extensive macros that Zack has written in them to score the games.  However, it is awkward and error-prone using Google Sheets to enter player identities and scores so I undertook this project to make things easier and less error-prone.

As of December 2, 2023, this project is very much a work-in-progress; it is not yet capable of doing what it intends, which is to replace the Google Sheets and macros. Someday I hope it will be.

### The Four Code Repositories

The project is in four parts:

#### scorebridge-ts-submodule

This TypeScript [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) is consumed by the three others.  Code moves here when it is needed from more than one other repository.  The following documentation is presented here because parts of it apply to all three other repositories.

#### scorebridge-webapp

The [webapp](https://github.com/timheilman/scorebridge-webapp) is a React app that runs in a browser.  The club admin (Zack) uses the webapp to administer the game.  It is hosted by the continuous integration/continuous deployment (CI/CD) facility provided by AWS Amplify Frontend Hosting.  Although AWS Amplify also offers a backend hosting facility, we do not use it preferring instead to use the serverless NPM framework as described in scorebridge-cloud, below.

#### scorebridge-device

The [device app](https://github.com/timheilman/scorebridge-device) is a React Native app that runs on iOS and Android.  Players use the device app to enter identities and scores.  So far in development the only build/deployment model in place is that using Expo Go.  The Expo iOS or Android app is used to run the device app on a phone or tablet. Ideally, eventually distribution of the device app should be done using the Apple App Store and Google Play Store, but for now Expo Go is the only means available.

#### scorebridge-cloud

The [cloud backend](https://github.com/timheilman/scorebridge-cloud) is built and deployed using the [NPM serverless](https://www.NPMjs.com/package/serverless) framework. It coordinates interaction between the webapp and device app.  It uses AWS AppSync, Cognito, DynamoDB, and Lambda.  It is NOT hosted by the CI/CD facility provided by AWS Amplify Backend Hosting; instead it is hosted on AWS by the NPM serverless framework.

### Identities and Environments

Two separate systems are used for identity management in this project.  For the identities of developers on the project, we use the AWS IAM Identity Center.  (For the identities of club admins and players in the game, we use AWS Cognito; see scorebridge-cloud for more information.) Although this part regarding developer identities is a bear, it is the best practice currently recommended by the union of AWS and the NPM serverless framework.

#### Services, AWS subaccounts, and Stages/Environments

In the serverless NPM framework, each "stage" or "environment" (these terms are synonymous) of scorebridge-webapp and scorebridge-cloud are hosted under differing AWS subaccounts of a root AWS account.  (These AWS subaccounts can host multiple environments, but each environment is only within a single AWS subaccount.)  An AWS subaccount corresponds to what the serverless NPM framework calls a "service".

All this is done to provide isolation between environments.  For example, the production environment for both scorebridge-webapp and scorebridge-cloud is hosted under one AWS account; the development environment is hosted under another.

Each AWS subaccount corresponding to an NPM serverless framework service is administered beneath a root AWS account, using AWS Organizations.

#### AWS IAM Identity Center, SSO, and the CLI

The AWS IAM Identity Center (previously known as AWS Single-Sign-On and still called `aws sso` on the AWS CLI) instance is associated with the root account of the project. The root account/subaccount relationship is managed in AWS Organizations.  Permission sets provide differential access for those AWS IAM Identity Center accounts to each of the AWS subaccounts beneath the root account, associated with each NPM serverless framework service.

Each developer on the project will need an account in AWS IAM Identity Center. This is not the same as an IAM account.  Instead, AWS IAM Identity Center acts as the Identity Provider (IdP) for IAM.  As such, there is an [SSO signin URL for the scorebridge Identity Center](https://d-92674207af.awsapps.com/start) that is separate from the general AWS signin page for AWS IAM (NOT-IdentityCenter) accounts.  (If you fork this project to run your own instance of this project, you will need to create your own AWS IAM Identity Center instance and signin URL.)

Your AWS Identity Center account is the one that you use to [configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) for build, deployment, and testing of scorebridge-webapp and scorebridge-cloud.  Once you have a profile in the AWS CLI configuration file for a particular env and permission set (using `aws configure sso`), you will need to update it with an extra line. Proceeding from here by example is probably clearest.  The extra line begins with `credential_process` in the following example `~/.aws/config` file:

```
[profile ScoreBridge-sbc00-tdh-PowerUser-profile]
sso_session = ScoreBridge-sbc00-tdh-PowerUser-session
sso_account_id = 437893194722
sso_role_name = PowerUserAccess
region = us-west-2
output = json
credential_process = aws configure export-credentials --profile ScoreBridge-sbc00-tdh-PowerUser-profile
[sso-session ScoreBridge-sbc00-tdh-PowerUser-session]
sso_start_url = https://d-92674207af.awsapps.com/start
sso_region = us-west-2
sso_registration_scopes = sso:account:access
```

In this example profile and session, `sbc00` corresponds to the NPM serverless framework service name.  It is kept short because AWS lambdas deployed by the NPM serverless framework are automatically named using both the NPM serverless framework service name *and* the environment name, since a single NPM serverless framework service (and thus, AWS subaccount) can host multiple environments.  `PowerUser` corresponds to the AWS IAM Identity Center permissions set.  `437893194722` is the AWS account number of the AWS subaccount, corresponding to the NPM serverless service `sbc00`, that hosts the `dev` and `tmpenv` environments.  `https://d-92674207af.awsapps.com/start` is the SSO start URL provided by scorebridge's root account AWS IAM Identity Center instance.  `us-west-2` is the AWS region in which the environments are hosted.  `tdh` refers to my own AWS IAM Identity Center account.

#### Expected env vars for your CLI

Once you have an AWS SSO profile set up, this project expects this env var to be set:

```zsh
export SB_TEST_AWS_CLI_PROFILE=ScoreBridge-sbc00-tdh-PowerUser-profile
```

This tells the build and test code in scorebridge-cloud and scorebridge-webapp which AWS SSO profile to use for the build, deploy, and test.  Switching which NPM serverless framework service/AWS subaccount you are pointed at is done by switching this env var to a different AWS SSO profile.  Within that service/account which env you are pointed at is done by setting the `STAGE` env var to the name of that env, which is accomplished by the `npm run exportEnvDev` and `npm run refreshExportedDetailsEverywhere` commands described below.  See the `package.json` file in scorebridge-cloud for more information.

#### scorebridge-cloud informing webapp and device of env-specific values

Once things are set up, a typical deployment and test of scorebridge-cloud, scorebridge-webapp, and scorebridge-device in the dev environment will look like this:

```
scorebridge-cloud% npm run deployDev
scorebridge-cloud% npm run exportEnvDev
scorebridge-cloud% npm run refreshExportedDetailsEverywhere
scorebridge-cloud% npm run test
scorebridge-cloud% cd ../scorebridge-webapp
scorebridge-webapp% npm start
```

And in a separate terminal:

```
scorebridge-webapp% npm run cypress:open
```

Then in the Cypress window, select E2E testing.  The tests should pass. For the device repo, in a separate terminal:

```
scorebridge-device% npx expo start
```

Then, to run the app:
 * For android, in the Expo Go app, scan the presented QR code
 * For iOS, with the Expo Go app already installed, in the Camera app scan the presented QR code

The app should launch and run.

### This submodule should be an NPM package

Ideally this submodule would be an NPM package.  However, at this stage in development this repo is still so volatile that the overhead of publishing and consuming an NPM package is not worth it.  When the repo stabilizes, it should be converted to an NPM package.


