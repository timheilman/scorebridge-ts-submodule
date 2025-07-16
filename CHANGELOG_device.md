# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.1.0](https://github.com/timheilman/scorebridge-device/compare/v2.0.3...v2.1.0) (2025-07-16)

### Features

- scor-478 improve board confirmation ux ([#93](https://github.com/timheilman/scorebridge-device/issues/93)) ([38e1a52](https://github.com/timheilman/scorebridge-device/commit/38e1a52602ce2a5b3671e8214d93391b3fd544f2))

### Bug Fixes

- scor-458 fix submodule fetch on eas servers ([#86](https://github.com/timheilman/scorebridge-device/issues/86)) ([4aa80fc](https://github.com/timheilman/scorebridge-device/commit/4aa80fc45bf25c69d62b874dcc7725722d8474f9))
- scor-464 wrong player names at board confirmation screen ([#85](https://github.com/timheilman/scorebridge-device/issues/85)) ([2c5f5cd](https://github.com/timheilman/scorebridge-device/commit/2c5f5cdcff2d221634d2a9e014deb94083f4e89d))
- scor-480 fix too-early Amplify call by replacing client with cachedClient in gqlClient.ts ([#88](https://github.com/timheilman/scorebridge-device/issues/88)) ([56a934c](https://github.com/timheilman/scorebridge-device/commit/56a934cc42760411dd7b277fd161654d15d48927))

## [2.0.3](https://github.com/timheilman/scorebridge-device/compare/v2.0.2...v2.0.3) (2025-07-03)

### Bug Fixes

- scor-461 stringify dispatchRegister.catch error for propagation to dd ([dd247b9](https://github.com/timheilman/scorebridge-device/commit/dd247b9d878b25bccf362dcd16e49dea266df158))

## [2.0.2](https://github.com/timheilman/scorebridge-device/compare/v2.0.1...v2.0.2) (2025-07-03)

### Bug Fixes

- scor-457 get prod errors into DataDog rum errors ([#83](https://github.com/timheilman/scorebridge-device/issues/83)) ([7c964b7](https://github.com/timheilman/scorebridge-device/commit/7c964b7058ecb2ce364843bf0019870f689d70d1))

## [2.0.1](https://github.com/timheilman/scorebridge-device/compare/v2.0.0...v2.0.1) (2025-07-03)

### Bug Fixes

- scor-456 fix contrast for InitScreen errors and propagate to datadog ([#82](https://github.com/timheilman/scorebridge-device/issues/82)) ([f3fa9d8](https://github.com/timheilman/scorebridge-device/commit/f3fa9d8263510f3cf0882592081329e10ec88793))

## [2.0.0](https://github.com/timheilman/scorebridge-device/compare/v1.7.1...v2.0.0) (2025-07-03)

### ⚠ BREAKING CHANGES

- scor-354-360 convert update board result to use resolver timestamps (#45)
- scor-337 clean up upsert board result for type safety (#33)
- scor-308 out of order subscription notifications cause infinite spinny (#29)
- scor-301 remove deprecated graphql enum values, mutations, and subscription (#21)
- scor-298 upgrade to expo sdk 52, dropping support for android 6, api level 23 (#19)

- scor-301 remove deprecated graphql enum values, mutations, and subscription ([#21](https://github.com/timheilman/scorebridge-device/issues/21)) ([6d75d3b](https://github.com/timheilman/scorebridge-device/commit/6d75d3bbb0f4df64a255ac099bb69ad89a4ec411))
- scor-337 clean up upsert board result for type safety ([#33](https://github.com/timheilman/scorebridge-device/issues/33)) ([64133ec](https://github.com/timheilman/scorebridge-device/commit/64133eca2edccfacaa462662de1609b6b8f7dfbf))
- scor-354-360 convert update board result to use resolver timestamps ([#45](https://github.com/timheilman/scorebridge-device/issues/45)) ([63b3efb](https://github.com/timheilman/scorebridge-device/commit/63b3efb356451866edbbf496a0e764e082340de4))

### build

- scor-298 upgrade to expo sdk 52, dropping support for android 6, api level 23 ([#19](https://github.com/timheilman/scorebridge-device/issues/19)) ([c1e0a2c](https://github.com/timheilman/scorebridge-device/commit/c1e0a2cbdc3f5c01fd4919ad7d58232b8cb54cd6))

### Features

- scor-305 improve advance round mechanics ([#79](https://github.com/timheilman/scorebridge-device/issues/79)) ([9a6569d](https://github.com/timheilman/scorebridge-device/commit/9a6569d589c9634a6502d45840d6d930b60ed4e8))
- scor-345 add card above contract entry for boardResult ([#56](https://github.com/timheilman/scorebridge-device/issues/56)) ([3cc359e](https://github.com/timheilman/scorebridge-device/commit/3cc359eadb04c4af77f35ab152aa69fd8005a1af))
- scor-349 make doubling icons behave the same as all other contract icons ([#35](https://github.com/timheilman/scorebridge-device/issues/35)) ([679ae6e](https://github.com/timheilman/scorebridge-device/commit/679ae6e9f23e3c5e5ad4e45b7f66cc360286034f))
- scor-351 make board entry header same summary as shown on round summary ([eaf37b2](https://github.com/timheilman/scorebridge-device/commit/eaf37b293f1db068b41896f880865eb190b888b2))
- scor-352 label board summary bits, including when crosshairs question-mark ([ae89857](https://github.com/timheilman/scorebridge-device/commit/ae898575542f1326db46a4f3213ff5dd68dee1ff))
- scor-379 show bidding box score at results entry screen ([dae628f](https://github.com/timheilman/scorebridge-device/commit/dae628fff0647bf9497077e9da902a569a3ba03e))
- scor-380 make bottom navigation tabs permanent ([#51](https://github.com/timheilman/scorebridge-device/issues/51)) ([6d67c64](https://github.com/timheilman/scorebridge-device/commit/6d67c645bc92238dc1edc43d13b9f4680887f7fc))
- scor-383 improved player assignments ([#67](https://github.com/timheilman/scorebridge-device/issues/67)) ([3169ba8](https://github.com/timheilman/scorebridge-device/commit/3169ba86872fed4085a60683bab5eb87efb99b9f))
- scor-384 improved post player assignment table tab ([#69](https://github.com/timheilman/scorebridge-device/issues/69)) ([3d7fb70](https://github.com/timheilman/scorebridge-device/commit/3d7fb70088dcf3ff9adb885716702078e314d18a))
- scor-385 N/S and E/W must accept the result after any changes reaching a scorable board result ([4aabdec](https://github.com/timheilman/scorebridge-device/commit/4aabdec80777edc1b5bdda7ba2b2a46fa1c9d9aa))
- scor-388 scoresheet split between round and board summaries ([#58](https://github.com/timheilman/scorebridge-device/issues/58)) ([3475348](https://github.com/timheilman/scorebridge-device/commit/3475348f597a07fe3610e80316a578f4ff8de38c))
- scor-395 Enhance scoreSheet modality: add board confirmation screen ([0111c59](https://github.com/timheilman/scorebridge-device/commit/0111c591e9223baf886367fd3a5bbe943665be67))
- scor-411 make confirm button wiggle ([#63](https://github.com/timheilman/scorebridge-device/issues/63)) ([149c458](https://github.com/timheilman/scorebridge-device/commit/149c458b54ce969d6c212cc799bfad5916ec89c6))
- scor-413 make player board confirm buttons smaller to avoid accidental tap ([#66](https://github.com/timheilman/scorebridge-device/issues/66)) ([13cf703](https://github.com/timheilman/scorebridge-device/commit/13cf70333b9aee3d0e94ec0e8fbd009f9bcba6fc))
- scor-418 matchpoints screen ([#80](https://github.com/timheilman/scorebridge-device/issues/80)) ([2825191](https://github.com/timheilman/scorebridge-device/commit/2825191285574c6b30da2cdedd6333f42679b64c))
- scor-424 add "remains stationary" verbiage ([#77](https://github.com/timheilman/scorebridge-device/issues/77)) ([01fefa3](https://github.com/timheilman/scorebridge-device/commit/01fefa39057702842ae2ea1ffc7d724ca7b56b8a))
- scor-426 consume new tablet registration approach ([#70](https://github.com/timheilman/scorebridge-device/issues/70)) ([6720836](https://github.com/timheilman/scorebridge-device/commit/67208366e8d84615f77df21eec57c3aad021f1bc))
- scor-436 integrate with datadog, stack traces still not symbolicated ([#73](https://github.com/timheilman/scorebridge-device/issues/73)) ([7089612](https://github.com/timheilman/scorebridge-device/commit/7089612af399023845ed61ed5ab2fd4481d132a4))
- score-373 re enable partial board results ([#48](https://github.com/timheilman/scorebridge-device/issues/48)) ([3ca4e9f](https://github.com/timheilman/scorebridge-device/commit/3ca4e9f17acb357e281b0480a2224c2a01b4e2aa))

### Bug Fixes

- scor-290 back button from round 1 welcome screen throws "cannot read property playerId of undefined" ([#15](https://github.com/timheilman/scorebridge-device/issues/15)) ([3b86694](https://github.com/timheilman/scorebridge-device/commit/3b86694b9f7a4717acbad24e58778addb2702190))
- scor-297 remove all void keywords to disregard promise resolution; always log it ([#18](https://github.com/timheilman/scorebridge-device/issues/18)) ([9406d27](https://github.com/timheilman/scorebridge-device/commit/9406d27317f3045de77fc7699f0cf2cd7a57540e))
- scor-300 two more void promise invocations missed in scor-297 ([#20](https://github.com/timheilman/scorebridge-device/issues/20)) ([cb89ff1](https://github.com/timheilman/scorebridge-device/commit/cb89ff1123a69a9c82cbe53c1ddd92ab76d46fa8))
- scor-308 out of order subscription notifications cause infinite spinny ([#29](https://github.com/timheilman/scorebridge-device/issues/29)) ([d38a9fe](https://github.com/timheilman/scorebridge-device/commit/d38a9fe65baecc67a3345fdf963b20e85282abaa))
- scor-342 cannot unassign table ([#32](https://github.com/timheilman/scorebridge-device/issues/32)) ([11d15c2](https://github.com/timheilman/scorebridge-device/commit/11d15c2b99489030c20000fe0a6e5309e9020ea6))
- scor-343 table unassignment from round welcome screen ([#34](https://github.com/timheilman/scorebridge-device/issues/34)) ([2f4ac20](https://github.com/timheilman/scorebridge-device/commit/2f4ac20a362db6703d3b057def117050589c8139))
- scor-378 percentage is not showing for passed-out boards ([d58d411](https://github.com/timheilman/scorebridge-device/commit/d58d4114d87e9b7ef39c66a21d24dc89c5b09991))
- scor-381 Round N/M is subscript, title bar on results screen has addl subscript 'Results' ([#50](https://github.com/timheilman/scorebridge-device/issues/50)) ([95db781](https://github.com/timheilman/scorebridge-device/commit/95db7810cb0369d5032da9bcdfdf477eef8b604e))
- scor-382 crash at new game after round 2 welcome reached ([#49](https://github.com/timheilman/scorebridge-device/issues/49)) ([e025476](https://github.com/timheilman/scorebridge-device/commit/e0254767653a998f6a1d3ed45afda0199bf71f80))
- scor-391 score sheet could be interacted with before player assignment ([#53](https://github.com/timheilman/scorebridge-device/issues/53)) ([b4289e6](https://github.com/timheilman/scorebridge-device/commit/b4289e66e4d9bca835ec81b40829febb297f7811))
- scor-392 reassigning tablet gives impossible quiz ([#54](https://github.com/timheilman/scorebridge-device/issues/54)) ([0f473fa](https://github.com/timheilman/scorebridge-device/commit/0f473fa95e933e135905d829da9b281a1126b7b6))
- scor-394 player assignment quiz answered wrong gives unmatched route ([#55](https://github.com/timheilman/scorebridge-device/issues/55)) ([dae55d3](https://github.com/timheilman/scorebridge-device/commit/dae55d3731fc1863264f4110dad4f1e91cd77d46))
- scor-400 apply activity indicator for all board summary items ([#62](https://github.com/timheilman/scorebridge-device/issues/62)) ([c599115](https://github.com/timheilman/scorebridge-device/commit/c599115b39f480a17e11845ba7be2223c26a94db))
- scor-412 update submodule to make q/m/s game fields consistent across all 3, add ta.currentAsOf ([#61](https://github.com/timheilman/scorebridge-device/issues/61)) ([7253a2a](https://github.com/timheilman/scorebridge-device/commit/7253a2a5ca14c137306612bee1d48ed030abf5e0))
- scor-415 down the maximum possible amount was not being considered valid ([#64](https://github.com/timheilman/scorebridge-device/issues/64)) ([8b5aee2](https://github.com/timheilman/scorebridge-device/commit/8b5aee21bcf5757afe74d706f131d43c74b80677))
- scor-417 do not wiggle confirm button for not played or passed out boards ([#65](https://github.com/timheilman/scorebridge-device/issues/65)) ([e519935](https://github.com/timheilman/scorebridge-device/commit/e5199351ba0155f9cac864636ba61bd127cbb976))
- scor-425 unauthorized exception with amplify library ([#71](https://github.com/timheilman/scorebridge-device/issues/71)) ([c2d0076](https://github.com/timheilman/scorebridge-device/commit/c2d00760b0ff2dc824ce65bfa8138cf5bd90fbff))
- scor-432 stop shore sheet tab wiggle on wrong screens ([#76](https://github.com/timheilman/scorebridge-device/issues/76)) ([36ad227](https://github.com/timheilman/scorebridge-device/commit/36ad227037ab146fcef9be5220219d8a60732039))
- scor-452 418 game over mp% should be last round players, correct last round alert ([#81](https://github.com/timheilman/scorebridge-device/issues/81)) ([e3a9d7a](https://github.com/timheilman/scorebridge-device/commit/e3a9d7af78aa0a441fb0b5a1e4932da09c16d7aa))
- type BoardResultUl already has a required confirmed boolean ([#59](https://github.com/timheilman/scorebridge-device/issues/59)) ([e47cb68](https://github.com/timheilman/scorebridge-device/commit/e47cb680e804988ff00dfeaf41b5312cc962af17))
- typescript error message below ([#16](https://github.com/timheilman/scorebridge-device/issues/16)) ([df10333](https://github.com/timheilman/scorebridge-device/commit/df103335add34dff5ed61420c912e5c44103cbee))

## [1.7.1](https://github.com/timheilman/scorebridge-device/compare/v1.7.0...v1.7.1) (2024-11-11)

### Bug Fixes

- scor-292 intermittent player name filter not clearing upon tab switch ([#14](https://github.com/timheilman/scorebridge-device/issues/14)) ([bc51af5](https://github.com/timheilman/scorebridge-device/commit/bc51af5cf51176e48542067c8d6e3fea5aec2059))

## [1.7.0](https://github.com/timheilman/scorebridge-device/compare/v1.6.0...v1.7.0) (2024-11-10)

### Features

- scor-288 add additional textual guidance throughout app ([#13](https://github.com/timheilman/scorebridge-device/issues/13)) ([1d73bee](https://github.com/timheilman/scorebridge-device/commit/1d73beed449afdd9e5278dcdd21f3276a155e1f8))

### Bug Fixes

- scor-292 player assignment left column S & E swap not showing ([#12](https://github.com/timheilman/scorebridge-device/issues/12)) ([ff6d1d9](https://github.com/timheilman/scorebridge-device/commit/ff6d1d9717f35f2263cf0d1eb3ed997efaed9470))

## [1.6.0](https://github.com/timheilman/scorebridge-device/compare/v1.5.0...v1.6.0) (2024-11-04)

### Features

- scor-260 choose starting board from round welcome screen ([#7](https://github.com/timheilman/scorebridge-device/issues/7)) ([ee15ddf](https://github.com/timheilman/scorebridge-device/commit/ee15ddf739a87cf6b7201e46f56131bab880bc4e))
- scor-274 colorize made and down icons, to reduce down-1-instead-of-made-1 errors ([#8](https://github.com/timheilman/scorebridge-device/issues/8)) ([5c34098](https://github.com/timheilman/scorebridge-device/commit/5c340980fe51af60e47e93ad8aca6d2cafb2f750))
- scor-285 improve design of player assignment screens ([#10](https://github.com/timheilman/scorebridge-device/issues/10)) ([ca2b63f](https://github.com/timheilman/scorebridge-device/commit/ca2b63f64b6477ed7d4b5e296c7fdd8226f0c2c8))

### Bug Fixes

- scor-275 do not get stuck on round 0 welcome screen ([#6](https://github.com/timheilman/scorebridge-device/issues/6)) ([7ac3438](https://github.com/timheilman/scorebridge-device/commit/7ac34389daa9000c5e58d58fe03736b8eab82a1a))

## [1.5.0](https://github.com/timheilman/scorebridge-device/compare/v1.4.0...v1.5.0) (2024-10-20)

### Features

- scor-268 better in-app error reporting ([#5](https://github.com/timheilman/scorebridge-device/issues/5)) ([63c7ee8](https://github.com/timheilman/scorebridge-device/commit/63c7ee8e8f1b24114ff6433bb8c46d5013de1f23))

## [1.4.0](https://github.com/timheilman/scorebridge-device/compare/v1.3.1...v1.4.0) (2024-10-19)

### Features

- change app name-under-icon to DevBF4Clubs / BFridge4Clubs ([afe1472](https://github.com/timheilman/scorebridge-device/commit/afe1472e8fd3fe719bc3d8d324a07cf320859b65))
- scor-273 remove not useful rotation confirmation screen ([#3](https://github.com/timheilman/scorebridge-device/issues/3)) ([590bfcf](https://github.com/timheilman/scorebridge-device/commit/590bfcfafe121af7f77981e6c1a0be911e31e9e9))

### Bug Fixes

- scor-267 replacement tablet should resume at current state for table ([#2](https://github.com/timheilman/scorebridge-device/issues/2)) ([de0f9bc](https://github.com/timheilman/scorebridge-device/commit/de0f9bc473fc9c786fc15f7452c4f5ad3c1b99bc))
- scor-268 best guess fix to: tablet loses federated jwt must be reregistered ([#4](https://github.com/timheilman/scorebridge-device/issues/4)) ([4b3cee8](https://github.com/timheilman/scorebridge-device/commit/4b3cee8925d62d2705276596150e2e07b4a49c82))
- scor-271 development build crash on expo-dev-client < 4.0.25 ([8892b76](https://github.com/timheilman/scorebridge-device/commit/8892b76e531541cff7bfa0ec063961c47e11bf15))

## [1.3.1](https://github.com/timheilman/scorebridge-device/compare/v1.3.0...v1.3.1) (2024-08-15)

### Bug Fixes

- scor-259 most-recently-played board % scores not displayed at round confirm screen ([6c002a3](https://github.com/timheilman/scorebridge-device/commit/6c002a3841c6c3554b0cdd7221251af3d03b8500))

## [1.3.0](https://github.com/timheilman/scorebridge-device/compare/v1.2.0...v1.3.0) (2024-08-14)

### Features

- player selection: turn off autocomplete and sort the filtered roster ([f7a3c9e](https://github.com/timheilman/scorebridge-device/commit/f7a3c9eb772d7bc9132190e0658a72db1a0e690f))

### Bug Fixes

- crash from null doubling value ([a5c2868](https://github.com/timheilman/scorebridge-device/commit/a5c28689e50f28608cc894b34eff5dd8c193a6a6))
- scor-157 iOS splashscreen never hid, update maestro flow tho it does not catch ([3ffab1b](https://github.com/timheilman/scorebridge-device/commit/3ffab1b93588f27b5db67027bc333c52cb056dce))
- scor-249 final round confirmation shows roundCount + 1 rather than a game over icon ([0c314c7](https://github.com/timheilman/scorebridge-device/commit/0c314c7af1f50b88280d06994f64431553337754))
- scor-255 old clients need correct board result subscr notifications even if outcome set early ([0988915](https://github.com/timheilman/scorebridge-device/commit/0988915e47ee89ffb27ec0fe47079395fcd1287a))
- scor-257 stop type===PLAYED interfering with board result equality and staying on cloud sync ([8d9ff00](https://github.com/timheilman/scorebridge-device/commit/8d9ff00170630a22f4213a15a37da87f37b40201))
- scor-258 do not crash at player confirmation tab if not-all players have been specified ([4afdd9b](https://github.com/timheilman/scorebridge-device/commit/4afdd9bd8c575d857898b1aebd39b4eb3e64926f))

## [1.2.0](https://github.com/timheilman/scorebridge-device/compare/v1.1.2...v1.2.0) (2024-08-06)

### Features

- add BoardCard.tsx, title each card ([4c179d6](https://github.com/timheilman/scorebridge-device/commit/4c179d6d7ea96093affd47a683dfa3e84c5ac656))
- add common button border to BoardSummaries on RoundConfrimBody ([4e3c6c5](https://github.com/timheilman/scorebridge-device/commit/4e3c6c5196c3d73a998c588adbad57547d82d095))
- small margin for board cards ([25a1a42](https://github.com/timheilman/scorebridge-device/commit/25a1a42fc35434511d277dc22d6eacf22680eb51))
- use outline icons for low-emphasis ([135247e](https://github.com/timheilman/scorebridge-device/commit/135247eaea98f65c4414bc428740c5f80790ba26))
- use round transitioning icon for RoundConfirm screen ([7cbc7ea](https://github.com/timheilman/scorebridge-device/commit/7cbc7ead20f9c708e85f54c0c098bd9141d8e8f4))

### Bug Fixes

- allow old clients to receive subscr notifications from new ones even if not doubled ([482c7b2](https://github.com/timheilman/scorebridge-device/commit/482c7b2bf5eb2a728e1caf1433a082d7072a1027))
- another crash at startup ([656bc80](https://github.com/timheilman/scorebridge-device/commit/656bc8052caa6b65fdc55803b5558e7689b177cb))
- another startup crash, from <number> && <Component>, resulting in 0 rendering outside Text comp ([787cee5](https://github.com/timheilman/scorebridge-device/commit/787cee5414a579179d73531574b4b5bd562465ad))
- crash at startup when using a RAINBOW movement ([9207549](https://github.com/timheilman/scorebridge-device/commit/920754907bbe235522a0525c3114ff3428a71a8d))
- icons disappearance, and build: add scripts for local builds of android ([29b395c](https://github.com/timheilman/scorebridge-device/commit/29b395c3e65267acfb19363e459cc8d96ecaca03))
- scor-191 fix typing for shallowEqualWithNull ([ece3fa4](https://github.com/timheilman/scorebridge-device/commit/ece3fa450c65973aa5db6df7e069ecc56362a357))
- scor-241 center cloud sync icon, some other issues w/scor-244 and doubling deprecation ([c1a8add](https://github.com/timheilman/scorebridge-device/commit/c1a8add4783238027efaf3e8aae3400d677fca52))
- scor-244 reinstate assignResult and onAssignResult for subscription backward-compat ([02a30ed](https://github.com/timheilman/scorebridge-device/commit/02a30ed31158bba484e5e0d31af3e9f94f349b97))
- scor-247 auto-sized board icon fix ([ed6d56c](https://github.com/timheilman/scorebridge-device/commit/ed6d56c60f1cb70253d8d705c07a0e98da4e8ea9))
- some BoardTab toggle buttons were not properly disabled while selected ([4c2bb65](https://github.com/timheilman/scorebridge-device/commit/4c2bb65fb764abc250c92c2a5b3bc0a8c9ad5363))

## [1.1.2](https://github.com/timheilman/scorebridge-device/compare/v1.1.1...v1.1.2) (2024-08-03)

### Bug Fixes

- hopefully, translations missing in prod app ([ac301bb](https://github.com/timheilman/scorebridge-device/commit/ac301bb98ca1e780d306454298803cb33310bd5a))
- login problem Auth UserPool Not Configured ([aaf54a6](https://github.com/timheilman/scorebridge-device/commit/aaf54a6906ca100d4ecfcc47061f5b17412ac3d8))
- scor-240 downgrading to expo sdk 49 requires babel plugin for expo-router ([8065d83](https://github.com/timheilman/scorebridge-device/commit/8065d830cbe1ebbfc8bb46e8a821c883860fdd52))
- scor-240 ensure i18n is called even if before tabs routing and get hooks to top of screen ([f379933](https://github.com/timheilman/scorebridge-device/commit/f379933aa8f1e0d10ec2d58dd24cfde37be83867))

## [1.1.1](https://github.com/timheilman/scorebridge-device/compare/v1.1.0...v1.1.1) (2024-08-01)

## 1.1.0 (2024-08-01)

### Features

- 3-table HOWELL ([77dffbe](https://github.com/timheilman/scorebridge-device/commit/77dffbe9168bccd1c25336f3f02e71a748b36728))
- 6-table HOWELL ([26d8410](https://github.com/timheilman/scorebridge-device/commit/26d8410f718cd652a76b0ce00d71128245a4447b))
- a little more context to RoundWelcome ([9009a8e](https://github.com/timheilman/scorebridge-device/commit/9009a8ea2ccf1544c12848ed68565a70fbf18c2c))
- add board group calculations for traditional RAINBOW, extend to 4 rounds of 7-table ([7bdd377](https://github.com/timheilman/scorebridge-device/commit/7bdd377599f433e2cd608f98261f8b3578f81919))
- add debug information on green-card init screen and red wifi symbol ([f565eea](https://github.com/timheilman/scorebridge-device/commit/f565eea79465beb61be18bbbffeebd76f0c7634d))
- add placeholder BoardCompleted screen ([204cada](https://github.com/timheilman/scorebridge-device/commit/204cadaf85b3fda418ddfb0d510fa97394ec190a))
- add placeholder gameOver tab and thus route ([8268de4](https://github.com/timheilman/scorebridge-device/commit/8268de43672fb599720920317b8df7901d17d6f7))
- add two-table RAINBOW-ish movement per Zack's sheet ([7fd5b09](https://github.com/timheilman/scorebridge-device/commit/7fd5b09756d9c300b8c5cd12e888ddd8cc72faa1))
- allow names to line-break in declarer box ([a6414f2](https://github.com/timheilman/scorebridge-device/commit/a6414f2e7c867c17a197a1bb9f8796c48634cc09))
- another waiting screen for game fetch, and refactor: ([6fcc62b](https://github.com/timheilman/scorebridge-device/commit/6fcc62b1eb1dc0ac6dc4f6c42f0b8d4779d3762b))
- assign player names, getting there with UI ([bb5c3fb](https://github.com/timheilman/scorebridge-device/commit/bb5c3fbdb11de9f5509237dad66cd9d6ba2e5378))
- assignResult gets us close to MVP ([8fc25de](https://github.com/timheilman/scorebridge-device/commit/8fc25decc3ac6a64cc001d9f6bd51b1c6441377b))
- barely workable contract assignment except for bottom buttons on ios ([de0fa1e](https://github.com/timheilman/scorebridge-device/commit/de0fa1ed518f7674532bd2526b532123c68ed061))
- better confirm contract button, auction passed out button ([4458d17](https://github.com/timheilman/scorebridge-device/commit/4458d171a6bcd56c40d81624597a0c2748c8dd62))
- board skipped button ([29f5f01](https://github.com/timheilman/scorebridge-device/commit/29f5f0193f645bad61a9e6f23a098375aa139f32))
- checkpoint, first mutation success w/setTableNumber ([b1f0e6c](https://github.com/timheilman/scorebridge-device/commit/b1f0e6c44920811d03acc434245ab75ff7cfd24a))
- checkpoint, first successful subscription, clubName ([ec1af48](https://github.com/timheilman/scorebridge-device/commit/ec1af481f79fe3e362e58689980a0e171cd9db86))
- checkpointing transitioning screen before it is a route ([dc845d7](https://github.com/timheilman/scorebridge-device/commit/dc845d723b6076faa548ae85951ca1c44453fa88))
- checkpointing welcome screen still pre-route ([3b56f1e](https://github.com/timheilman/scorebridge-device/commit/3b56f1e567652b7a17d041431dcbc2a8010f6b41))
- clean up assign board result screen ([f96f2d5](https://github.com/timheilman/scorebridge-device/commit/f96f2d5c851794444c69337575b889db9285acd5))
- cleanup of views ([e8c904a](https://github.com/timheilman/scorebridge-device/commit/e8c904acc47b1b6e8bf1b9aec32182a13b354dd3))
- clear level, strain, direction, doubling when passed out or unconfirmed ([9ce6701](https://github.com/timheilman/scorebridge-device/commit/9ce67016d3b01cbf5ccea2efa5963cf9f5253cc2))
- collapse N with S and E with W, reduce repetition ([6039ca3](https://github.com/timheilman/scorebridge-device/commit/6039ca30ad267370248f163718e6768e9a32e3e6))
- confirm player assignments button to placeholder screen ([7b8bea5](https://github.com/timheilman/scorebridge-device/commit/7b8bea520f391cd03c46a699772ee9467d6de1e4))
- confirm player assignments is setting round to 1 ([afdd1fb](https://github.com/timheilman/scorebridge-device/commit/afdd1fb5ad5ad81e07718b1b5ff99da50749c0b7))
- consume better tableAssignment and getClubWithCurrentGame from cloud ([310527e](https://github.com/timheilman/scorebridge-device/commit/310527ecf37c88624821728a8ec3619430df8fb6))
- consume DirectionalFlexBox for round completed screen ([118fa4d](https://github.com/timheilman/scorebridge-device/commit/118fa4d42c32810031d3be2f8f19cf4d0cfc6946))
- consume playerNumber and boardGroup for round 1 ([a3287b3](https://github.com/timheilman/scorebridge-device/commit/a3287b3246b0c5d5a038aab2e0246c7e01e8028b))
- cut off bottom of bridgeFridge icon for better icon proportions ([58f57d5](https://github.com/timheilman/scorebridge-device/commit/58f57d5536a0066e7e701be99ef52740d6eedd74))
- disable all buttons on AssignPlayerScreen when anything in-flight ([1317c16](https://github.com/timheilman/scorebridge-device/commit/1317c165d5a6a448833991df51a3ae5700d43e66))
- disable go back button on ScreenAssignPlayer while in flight ([d9f32fe](https://github.com/timheilman/scorebridge-device/commit/d9f32fe871b799fed942236e381bec093c44015f))
- display unconfirmed player list when unique player names not 4 ([ad4e1cc](https://github.com/timheilman/scorebridge-device/commit/ad4e1cc856cca1af2beffab55482c25826934b65))
- do todo: table selection via single-click buttons ([ed6bb96](https://github.com/timheilman/scorebridge-device/commit/ed6bb96d46b922430461105650a45ad6c1c0fd4d))
- do todos, handle multi-digit table numbers and ([db0c3b0](https://github.com/timheilman/scorebridge-device/commit/db0c3b04ef156baf471e1d649bbb4429fce9eb85))
- enable backing all the way up to board selection ([4024480](https://github.com/timheilman/scorebridge-device/commit/4024480327e8e08ee4356a6d2d9790091a3ee0dc))
- enable discernment between current game and no current game ([0511413](https://github.com/timheilman/scorebridge-device/commit/05114136ebf5490c6c94f8ece1c6e53e4f821359))
- enable unsetting player assignments at round 1 welcome screen ([304f8e0](https://github.com/timheilman/scorebridge-device/commit/304f8e06764d31263517136ae836cc953303717a))
- even MITCHELL, 8 tested ([2353165](https://github.com/timheilman/scorebridge-device/commit/2353165b3416f2bd7a15a869add3c7536c82896e))
- finish up with table number selection for now ([f2cadb3](https://github.com/timheilman/scorebridge-device/commit/f2cadb344fc20820d967a290f7ed77d89b44a5a8))
- fix up board result confirmation screen ([8883b07](https://github.com/timheilman/scorebridge-device/commit/8883b0705a1639f17bc27ba84579e14824116150))
- fix whole-width button pressability, placeholder round welcome screen ([c7070b3](https://github.com/timheilman/scorebridge-device/commit/c7070b3ccd3e6c6658a67dbaf332d1fc4a52bd01))
- fixup sizings and fix: racing to table assignments should have one winner ([12af2a1](https://github.com/timheilman/scorebridge-device/commit/12af2a1bd9ff46cc0124be8c057da9bb4e0ee277))
- fixup starting board rotation warning ([23f9939](https://github.com/timheilman/scorebridge-device/commit/23f9939d846d5917e86c61507959b7bef7fc458d))
- flatList grid for LevelAndStrain selection ([137b151](https://github.com/timheilman/scorebridge-device/commit/137b1517f19eaff0db46ddef674a0423f17d578a))
- from-scratch autocomplete, hardcoded roster ([5b017b3](https://github.com/timheilman/scorebridge-device/commit/5b017b39fd41175afb7c12a125d1e11d18eeb533))
- fussy fiddling with presentation ([ddf17a7](https://github.com/timheilman/scorebridge-device/commit/ddf17a772ea92dc8cbdce02b655ca72603ff1240))
- game over screen ([ee0e27b](https://github.com/timheilman/scorebridge-device/commit/ee0e27bedb3e7e4873098e0c7ddfa96fcdcd1d02))
- get all directions on-screen for round completed screen ([32ff4e1](https://github.com/timheilman/scorebridge-device/commit/32ff4e11c05ecf798df5419369fc7f432fee351a))
- get known board number on-screen ([bd2cf1a](https://github.com/timheilman/scorebridge-device/commit/bd2cf1a3ecbf7cae69e42044eab1a373de241aee))
- get matchpoint scores per-board into results ([3a64cc3](https://github.com/timheilman/scorebridge-device/commit/3a64cc3375ef9b82e2e2a2193c9ee1a0a5b3a361))
- get results from other tables, and toward end game score ([34353ed](https://github.com/timheilman/scorebridge-device/commit/34353edb635052c004995b8f90aeb0a28e882751))
- get rid of flash-of-enablement on AssignPlayersScreen between ([13e1a77](https://github.com/timheilman/scorebridge-device/commit/13e1a77c0d21f2b2f1455bd6b06d093a9eec1f83))
- get scores at least for RAINBOW 1-table ([5e5ba83](https://github.com/timheilman/scorebridge-device/commit/5e5ba83553091f85676be6bbc8216d5647cca1f4))
- get to assignPlayer placeholder screen ([424bed3](https://github.com/timheilman/scorebridge-device/commit/424bed37ce5bd013fcd48709c198e49a0713ecfd))
- give both n/s and e/w results and do not repeat in button ([bd7150e](https://github.com/timheilman/scorebridge-device/commit/bd7150e951e1971e9e25135dedf0456c1a166bed))
- HOWELL 4-table ([7d22c2f](https://github.com/timheilman/scorebridge-device/commit/7d22c2f1db0cb754f12062cab3e73dcc52441416))
- HOWELL 5-table ([50f2fda](https://github.com/timheilman/scorebridge-device/commit/50f2fda4a85711e69c295461e4627aff99491ffe))
- i18n to get translation out of a file ([bec39af](https://github.com/timheilman/scorebridge-device/commit/bec39afa198bbc78205164c5ac7675f38318767f))
- if getGame has an error, display on-screen. Trying to ([244be2d](https://github.com/timheilman/scorebridge-device/commit/244be2db39790178eaa0902376dc2053f298a601))
- improve board tab for visuals, fix margin issue on player buttons, ([0db6ab1](https://github.com/timheilman/scorebridge-device/commit/0db6ab163af2b899dc53ab0dbfeea62d18ba85cc))
- improve registration login error presentation ([a3e8f8b](https://github.com/timheilman/scorebridge-device/commit/a3e8f8b6f23bb6f2ce8cca8525dac689a69c2189))
- improve ScreenBoardCompleted to use icons from prior screens ([65ca34c](https://github.com/timheilman/scorebridge-device/commit/65ca34c25257736c3b8347400240c0fc6b193cf0))
- improving initial round welcome screen ([dd0b1b6](https://github.com/timheilman/scorebridge-device/commit/dd0b1b6015466ebeff937bb7cd92ac7f25b8d7bc))
- in progress, calculations of where players where when ([4806556](https://github.com/timheilman/scorebridge-device/commit/4806556a79540c93b2cce19b94bcbd1c68079620))
- in-progress, unassign board button. However, there is a bug ([73219c0](https://github.com/timheilman/scorebridge-device/commit/73219c05588077939470b6a771610942e1481c1c))
- initial lead screen ([9d0667a](https://github.com/timheilman/scorebridge-device/commit/9d0667a8620711cdbd7b403b44a143a3abc8da1a))
- inversePlayerNumber via linear search ([282bf15](https://github.com/timheilman/scorebridge-device/commit/282bf1518d716c058ebba951623cf28076907f29))
- make board completed buttons at bottom and score big ([ea837f1](https://github.com/timheilman/scorebridge-device/commit/ea837f12d985118d91fa3e55ce46c41e81583321))
- make boardComplete MP% scores bigger ([600f2bf](https://github.com/timheilman/scorebridge-device/commit/600f2bf1a2719d9c0172716ca7143ec287ff36b3))
- make contract confirmation text rul rul big ([cac7e46](https://github.com/timheilman/scorebridge-device/commit/cac7e46942691b325d6f113de68ef5655411373e))
- make double icons into single icon, quiet logging, note todo ([b5b3ae2](https://github.com/timheilman/scorebridge-device/commit/b5b3ae26d0161e7ffdab615a9ad3ff51c2ec90e4))
- make icons for level strain doubling declarer teensy bit bigger ([ec69b4b](https://github.com/timheilman/scorebridge-device/commit/ec69b4b85a1b162ba372119bb9729831d5dd1943))
- make redouble blue to match bidding box card ([fff8f81](https://github.com/timheilman/scorebridge-device/commit/fff8f81f76654fd352c474c3eac5685cf0e1847c))
- make result a single press to reach boardCompleted screen ([6b1fe9d](https://github.com/timheilman/scorebridge-device/commit/6b1fe9db41bbce63c0d83ffd6d820552f71cf9f8))
- make RoundWelcome a route proper, with nav bar icon ([99204cc](https://github.com/timheilman/scorebridge-device/commit/99204cc4f846346d30a76934885947a3ecfacebe))
- make table icons match the felt color ([3df2821](https://github.com/timheilman/scorebridge-device/commit/3df28214d6a14a875cb1bb223b71294adba3e489))
- make table unassignment more robust if ([bd3c215](https://github.com/timheilman/scorebridge-device/commit/bd3c2152cb68bd52b8f01adaf0335c2f3a590271))
- MITCHELL w/odd number of tables, also ([a9d551b](https://github.com/timheilman/scorebridge-device/commit/a9d551b397c84bc73c2d577cc117255d21fed6b7))
- move assigned player indicators to right in header during player assignment ([d8ab3e8](https://github.com/timheilman/scorebridge-device/commit/d8ab3e83d9f7cdb3955c2708d3980866af651fc8))
- move canonicality of table number from device to cloud, in ([962fae8](https://github.com/timheilman/scorebridge-device/commit/962fae8984237a8bde4be6999e55412ef0167132))
- only warn in round confirm header if round advance enabled ([967cba4](https://github.com/timheilman/scorebridge-device/commit/967cba4db440f131c5a5482e7c41b3fdb69430a2))
- pass out button ([ca5d971](https://github.com/timheilman/scorebridge-device/commit/ca5d9711d3d7031270a5ee784bfaa845dbcddd14))
- per-direction board results-so-far on each board ([bcd2658](https://github.com/timheilman/scorebridge-device/commit/bcd265878a66dd80df95d09ae3f73c93c90c85a8))
- placeholder for initial lead selection ([bcffc4b](https://github.com/timheilman/scorebridge-device/commit/bcffc4b3bfbf86b75e6f692a85629ac13a5605b6))
- placeholder screen for round completion ([2f565ff](https://github.com/timheilman/scorebridge-device/commit/2f565ff3096c082da7db5d4d5f7e4e449c29c2aa))
- placeholders for sharing vs non-sharing boards screens ([cf094ad](https://github.com/timheilman/scorebridge-device/commit/cf094ad3a1f554ea89e42f9ac53b82f228d6b9fe))
- player assignment slowly getting some sort of UI ([f8e9199](https://github.com/timheilman/scorebridge-device/commit/f8e9199a1b79eeff421dbd01e182a8ecd7501827))
- player assignment subscriptions and revisit form field fill ([9ac1e6e](https://github.com/timheilman/scorebridge-device/commit/9ac1e6e6bae2a3de1ac631467a2d59db507b74c3))
- player roster no longer hard-coded; pull from cloud ([68aa297](https://github.com/timheilman/scorebridge-device/commit/68aa297853a1ff89c5390943277d85988e1a77a5))
- playerAssignment so far, need eas rebuild for SafeAreaView ([c389bf8](https://github.com/timheilman/scorebridge-device/commit/c389bf8bc1ff47b55f47c4b1ca5317460b033f57))
- playerAssignmentForm, subscriptions still to do ([5babf0d](https://github.com/timheilman/scorebridge-device/commit/5babf0d5bc2d3395e538e2d9a9c252facd880a44))
- prettify board selection and remove confirmBoard button ([eab3764](https://github.com/timheilman/scorebridge-device/commit/eab3764cebd94d060230d08ca3f103f29b7c6e51))
- provide scores at boardComplete screen ([e94d385](https://github.com/timheilman/scorebridge-device/commit/e94d385585792e5bfd041429f75a81e1d3553c5d))
- provide ScrollView of all board results ([df23bf7](https://github.com/timheilman/scorebridge-device/commit/df23bf719eefcb02e07ae1794d6aa70c9ab72234))
- provide subscription statuses when network has problems ([f0a5b9e](https://github.com/timheilman/scorebridge-device/commit/f0a5b9e65fa5db42b6e51a9c169e1f75a6cf2984))
- put round and boards into a heading ([37e15fb](https://github.com/timheilman/scorebridge-device/commit/37e15fb874e2d7d18782c0427614ffad20a8ae12))
- refine board end mp% more ([da57860](https://github.com/timheilman/scorebridge-device/commit/da578607094834526cf8c2b1e434aed84a65f6d0))
- refine board end screen mp% display ([6db2d5b](https://github.com/timheilman/scorebridge-device/commit/6db2d5b563250d2f7ac5f915242c47a49fa16c5e))
- reintroduce weighted scores alongside neuberg ([109fa10](https://github.com/timheilman/scorebridge-device/commit/109fa10fefd45a55ed3e4f4e1598acf37df9ab2b))
- remove right margin on declarer name and add two new subscriptions to ([993edb9](https://github.com/timheilman/scorebridge-device/commit/993edb93b319b0f3101fe783d02f4d890e0e6ae8))
- result screen placeholder ([e9ee1c2](https://github.com/timheilman/scorebridge-device/commit/e9ee1c222e6714d5ceca34f015fa1d568edc1f87))
- result selection screen ([c2a9db3](https://github.com/timheilman/scorebridge-device/commit/c2a9db38c66668bce4b2e0071483c8d601800f0c))
- SCOR-105 and SCOR-2 online/offline icon, which ([e8c8860](https://github.com/timheilman/scorebridge-device/commit/e8c8860f5b7af08196cb4fb80fd95ac3b74ce812))
- SCOR-105 online icon for device project ([a2f0e99](https://github.com/timheilman/scorebridge-device/commit/a2f0e991cca51c76334c423cd49ce6a4b3f5cf27))
- scor-193 automate aab releases w/changelog to prevent forgetting versionCode update ([b456197](https://github.com/timheilman/scorebridge-device/commit/b456197e7410e5168e1289b567fa6f2f5e42e4d6))
- scor-198 simplify ButtonActivityOverlay and use max(width, height) for iconSize ([ac89c43](https://github.com/timheilman/scorebridge-device/commit/ac89c43972753e8263e49196572f76a27a8d9b61))
- scor-199 require table number confirmation to proceed ([df1fd5a](https://github.com/timheilman/scorebridge-device/commit/df1fd5a702198bd4a41d7a2b6e154484c652b514))
- scor-208 fix scrollview for table selection but also obviate it on small screens ([cf0a6ea](https://github.com/timheilman/scorebridge-device/commit/cf0a6ead59b00f787ff31963b7331eaaacbe4735))
- scor-210 use bridge fridge image for splashScreen, reg button ([#1](https://github.com/timheilman/scorebridge-device/issues/1)) ([d926cbc](https://github.com/timheilman/scorebridge-device/commit/d926cbcbf8fc1950f9a0ca7467b2b8e16726b870))
- scor-211 add dealer D to fancy board icon ([785480d](https://github.com/timheilman/scorebridge-device/commit/785480d9635629f74b3be8cd03c890d5726636f1))
- scor-211 add disabled to ToggleButton ([f206819](https://github.com/timheilman/scorebridge-device/commit/f206819cabdc6baa59e86080d557e7a8525641e2))
- scor-211 add scrollview to boardTab ([31b3ab6](https://github.com/timheilman/scorebridge-device/commit/31b3ab68b80dd4a2c8aa1965588d31c92fca52c3))
- scor-211 added initial lead ([51d9cb1](https://github.com/timheilman/scorebridge-device/commit/51d9cb180986317c802a8ff48e9a6920a34fcde1))
- scor-211 at every confirm round press, warn of new boards ([32f6e34](https://github.com/timheilman/scorebridge-device/commit/32f6e3468edc5abb7bc27e466d301cd2253aaed5))
- scor-211 checkpointing better board tab icons ([46f0a98](https://github.com/timheilman/scorebridge-device/commit/46f0a9894df9d298001cc72969c4c7813d3a781b))
- scor-211 checkpointing board tabs ([a4f1fe2](https://github.com/timheilman/scorebridge-device/commit/a4f1fe28a9e224ef8d48c8521b2d19624ea307a4))
- scor-211 checkpointing Guarantor design for redirect mgmt ([403bae3](https://github.com/timheilman/scorebridge-device/commit/403bae3ec5a66d94ea42ccbb37ded8b65cf417d9))
- scor-211 checkpointing icon-driven first few screens, bug fixes ([c4fcfac](https://github.com/timheilman/scorebridge-device/commit/c4fcfac61ebcd0b80acdc0eee290e2c20ab57d78))
- scor-211 checkpointing todos, need two separate flavors of button: toggle and activity ([f98a8f8](https://github.com/timheilman/scorebridge-device/commit/f98a8f8ed14cfd012a939e84122a3d1f66c6f414))
- scor-211 checkpointing welcome screen ([5206838](https://github.com/timheilman/scorebridge-device/commit/52068388bfcc16948ef59db96796f753b9e713ac))
- scor-211 checkpointing work toward SVG boardIcon ([872f434](https://github.com/timheilman/scorebridge-device/commit/872f4349127521b2a17f407d85421d112f9d4660))
- scor-211 commenting out post-init hook-based exceptions ([37fd7c2](https://github.com/timheilman/scorebridge-device/commit/37fd7c2eebe9953db0ad44b503981e3e090c1863))
- scor-211 compact board screen ([bf51c20](https://github.com/timheilman/scorebridge-device/commit/bf51c207e518476a564580ce1aa39cbce9d15a9e))
- scor-211 extract choosestrain' ([58a8e14](https://github.com/timheilman/scorebridge-device/commit/58a8e14c0d1c1b69c1ac00db3c6ef8fd7e5f9e09))
- scor-211 icon improvements and roundConfirm placeholder ([6f31171](https://github.com/timheilman/scorebridge-device/commit/6f3117177e7e899a9344e4435f08aba34a94b509))
- scor-211 impl for result ([082cafe](https://github.com/timheilman/scorebridge-device/commit/082cafec867f701825c4646d064e8cc1dabc5502))
- scor-211 impl of doubling ([2af10c0](https://github.com/timheilman/scorebridge-device/commit/2af10c0bdec2f483629424d82534f86de7febc00))
- scor-211 make sure board confirm screen is in scroll view ([bccc017](https://github.com/timheilman/scorebridge-device/commit/bccc017c4b5d0e27a2f573a93e47719ab0b18fe2))
- scor-211 minor UI tweaks ([77c8c51](https://github.com/timheilman/scorebridge-device/commit/77c8c519c3aed81d9a175ce5087afb42f91bac61))
- scor-211 mirror cloud data as optimistic update data ([ba3769d](https://github.com/timheilman/scorebridge-device/commit/ba3769d506f43f343f79648560d4e9e78cf3bd1b))
- scor-211 progress toward advanceRound from confirmRound screen ([075e383](https://github.com/timheilman/scorebridge-device/commit/075e3837765bb71b7737a0c45ce08bd2bef742cf))
- scor-211 round summary screen ([948036e](https://github.com/timheilman/scorebridge-device/commit/948036e7090c1a665f37f03cff61eab3a660779b))
- scor-211 ToggleButtonDigit ([545d3f2](https://github.com/timheilman/scorebridge-device/commit/545d3f2bec7ab5062c9485622b1327e6f5cad7d5))
- scor-212 make registration fridge button square ([e5affd7](https://github.com/timheilman/scorebridge-device/commit/e5affd73aad49dc05ffd576e71ae9db1a6d87139))
- scor-216 add leaderboard to GameOver screen ([77fb155](https://github.com/timheilman/scorebridge-device/commit/77fb155696f984fb16d8c74df18d794ad23bf5a1))
- scor-222 persist roundWelcomeConfirmed to the cloud ([7736b4f](https://github.com/timheilman/scorebridge-device/commit/7736b4f9a2c8a568ce464e120aee32c8a534366a))
- scor-225,228 made unicord icon for uniqueness, cleanup thru translation.json ([70ef0e3](https://github.com/timheilman/scorebridge-device/commit/70ef0e3fe84e8ef86971d04008583e79638f26c4))
- scor-236 add any errors to network status tab ([c77e3b9](https://github.com/timheilman/scorebridge-device/commit/c77e3b9c6b1f99ad9631beb9bb592f8f1ca4c020))
- scor-237 remove gameOver screen leaderboard per Zack's request ([2a4cd90](https://github.com/timheilman/scorebridge-device/commit/2a4cd9074bba01206b7ff476abdae70b0f212f2b))
- sharing boards screen ([bac71ad](https://github.com/timheilman/scorebridge-device/commit/bac71ad411bec4d4b7c9a87695cb24344c668c13))
- show old and new board numbers ([dd03115](https://github.com/timheilman/scorebridge-device/commit/dd03115f7ed2a98ec6f2b2e1b26fce846b8eea59))
- show where boards are coming/going ([488908b](https://github.com/timheilman/scorebridge-device/commit/488908b199d478119f25850bde5d82f29a3a4da2))
- slim player entry form, auto-select id field, handle caps, and ([bdf261e](https://github.com/timheilman/scorebridge-device/commit/bdf261ee5781566be7a6d064739fc7fbe3a61e58))
- somewhat better selection color; arrow icons for directions ([9cc818b](https://github.com/timheilman/scorebridge-device/commit/9cc818bca69568d54bd0bbda0acb47bea94b63d8))
- start on assignPlayers and disable all tableAssignment buttons ([7facf92](https://github.com/timheilman/scorebridge-device/commit/7facf924776b3cbbaec17b87796fc6c3e18bfe6c))
- toward a scrolling contract selection ([8c322dd](https://github.com/timheilman/scorebridge-device/commit/8c322dd650191f90099520b4c39b8bef4efb397f))
- toward filling in board complete placeholder ([f1855c4](https://github.com/timheilman/scorebridge-device/commit/f1855c400a5fa8dc58ea0ad0088ea82045acf460))
- toward game data fetching ([ecf2b94](https://github.com/timheilman/scorebridge-device/commit/ecf2b94b3a3fb7dfeedd7189e1dcbaab0271882e))
- toward playerAssignmentConfirmed, i18n plurals ([60aae3e](https://github.com/timheilman/scorebridge-device/commit/60aae3e1b897ba6184d6a4c8ff3fa57165f1b0c2))
- toward selecting board even when not shared with other tables ([a31e382](https://github.com/timheilman/scorebridge-device/commit/a31e382ad776b7a1f2eaf8cb2344df2498d2e51d))
- try to fix splash screen and icons ([b3d02a7](https://github.com/timheilman/scorebridge-device/commit/b3d02a760175f20c2aadbcbe14739711b8300d4f))
- unassign table ([a0a2f2b](https://github.com/timheilman/scorebridge-device/commit/a0a2f2b3ed0dc64a47f93b0b10ec98dd88f086ff))
- use letters rather than arrows for declarer direction, and align left ([a92b514](https://github.com/timheilman/scorebridge-device/commit/a92b5146d77ed23ae75ff0d6707d12cd4748ed95))
- use more of screen for selection of level, strain, doubling, and declarer ([6844dec](https://github.com/timheilman/scorebridge-device/commit/6844dec3c06e4816b605cfde61ab655fa1768b30))
- use no-wifi and turn bar red when network gone ([21bf41c](https://github.com/timheilman/scorebridge-device/commit/21bf41c104dcf6c720f38622f2b0164a6dcd8bd2))
- use NT rather than crossed-out trumpet ([b9d99d0](https://github.com/timheilman/scorebridge-device/commit/b9d99d01075cb2b8c5fc3266f0e6e51ba13e2584))
- use text rather than plus/minus for board result entry, ([2f11028](https://github.com/timheilman/scorebridge-device/commit/2f110287ec7ba15ac8014cf9e7e30a1ce9133f02))
- very tiny start to Assign Contract ([df85197](https://github.com/timheilman/scorebridge-device/commit/df851978e043e6f6499960d8db99a25425e7205d))
- work on IconButton to use ActivityIndicatorOverlay ([81ba5b8](https://github.com/timheilman/scorebridge-device/commit/81ba5b89ce8b1b4f83876d2eb562fa385b8935be))

### Bug Fixes

- accommodate fallout from game potentially being null due to webapp game deletion ([0e6384d](https://github.com/timheilman/scorebridge-device/commit/0e6384d603af8f61491a12027b28eb7faeb8bfcc))
- actually-dispatch the action to move past awaiting auth session fetch ([9b18d4d](https://github.com/timheilman/scorebridge-device/commit/9b18d4de6b7c65b40f4c5b88252d54ddb8e6f866))
- actually-use HOWELL for HOWELL movement ([59f3dea](https://github.com/timheilman/scorebridge-device/commit/59f3dea8f17ae1818026fa1aa85e061ebec57482))
- add doubling message for confirmation when not doubled' ([74a2b18](https://github.com/timheilman/scorebridge-device/commit/74a2b180da95a48771ccd67e0de54627dc551fcf))
- advance round even if boards played w/out last board of round last, and ([d22ed19](https://github.com/timheilman/scorebridge-device/commit/d22ed191d698614a76296028f73434c5e17c3b14))
- advance round even when the last round played was passed-out or skipped ([f8483c1](https://github.com/timheilman/scorebridge-device/commit/f8483c1ae457e7fdf1f9054065ef51062b7c35e9))
- advance round when final board done ([e068750](https://github.com/timheilman/scorebridge-device/commit/e06875089023a6c5747bc89f3fe588bc070a31e6))
- Alert.alert not just alert ([e950711](https://github.com/timheilman/scorebridge-device/commit/e950711a3453c795ec1479e30a63a55823600356))
- allow board groups to return to a table they were at before ([746e427](https://github.com/timheilman/scorebridge-device/commit/746e427f6e3d9051a2c68785ee329743d4852729))
- allow board numbers over 20 to display their first digit ([25c2796](https://github.com/timheilman/scorebridge-device/commit/25c27961ad28c751d055d9249a17c7fbcc923d44))
- also setActualHeight/width via table icon on RoundWelcome header ([a470423](https://github.com/timheilman/scorebridge-device/commit/a47042387fbb8b5f9791e30a6688dcc2be342b3c))
- apply neuberg's formula to matchpoint pcts ([dda8db0](https://github.com/timheilman/scorebridge-device/commit/dda8db02f46e7e4966796fcda4e74dc5ec0f7748))
- auto-redirect to welcome screen upon boot ([c2c1f5a](https://github.com/timheilman/scorebridge-device/commit/c2c1f5a90f08e3413bd5101cfd4a42bc9343fab6))
- board > 10 gives board number not question mark ([a5c27b5](https://github.com/timheilman/scorebridge-device/commit/a5c27b5a253e1339e76a4b8bdd5c806a93c4f233))
- clear newly normalized playerAssignments and tableAssignments ([c1e1b3a](https://github.com/timheilman/scorebridge-device/commit/c1e1b3a04c26057051f3fc3da1acca703fd61842))
- clear normalized boardResults, playerAssignments, tableAssignments ([5d59e2a](https://github.com/timheilman/scorebridge-device/commit/5d59e2a78477cb40ec906ab9c226876ba172e0f3))
- cloud sync icon before RoundConfirm ([c1abf82](https://github.com/timheilman/scorebridge-device/commit/c1abf821f656f5a7f18b26f93890b5a7b9799b44))
- consume enum for DirectionLetter ([5062a47](https://github.com/timheilman/scorebridge-device/commit/5062a47bd60e6276cbaf558a0f1e175f2533526c))
- consume new enum approach ([07d05e7](https://github.com/timheilman/scorebridge-device/commit/07d05e754deb421aef910eed5735e2a172e91011))
- crypto.randomUUID is not actually present on android ([3e01241](https://github.com/timheilman/scorebridge-device/commit/3e012417fcf6c6ce14ed3d54af6c2d9b304b1e09))
- difficult to reproduce null pointer exception ([ba0d1e6](https://github.com/timheilman/scorebridge-device/commit/ba0d1e6604256d9c44121791621f4a94b28e8f75))
- directionLetter is single letter ([169b3c7](https://github.com/timheilman/scorebridge-device/commit/169b3c73521e10806959d6c83bfb2423e38a83b2))
- disallow multiple tablets from claiming the same table via ([8695207](https://github.com/timheilman/scorebridge-device/commit/869520759ba310318d994c9ecf920ee61dcc3d8b))
- do not advance beyond player assignment screen automatically in ([ccf6fb2](https://github.com/timheilman/scorebridge-device/commit/ccf6fb25858f02b2f7fabe36e21190ec56409738))
- emphasis should be optional on UnconfirmedPlayerIcon ([bfb3a02](https://github.com/timheilman/scorebridge-device/commit/bfb3a022fec0e524aac100d8464c309142b357e9))
- ensure board results fully visible on AssignBoardResult even on small screens ([443bbf9](https://github.com/timheilman/scorebridge-device/commit/443bbf9f0b12e36776687a696e92c034adcd2653))
- expo-doctor failure due to too-late version of async storage and ([0065e95](https://github.com/timheilman/scorebridge-device/commit/0065e95b849b3b5793f6dbbc4f0d67fd3a1109b5))
- figured out fix for short t import, added todo ([218cc1b](https://github.com/timheilman/scorebridge-device/commit/218cc1bb1f9c3280e3fa902e6b69e3c3598f0b04))
- final conversion site to react-i18next; still using at-init resources ([8fbb456](https://github.com/timheilman/scorebridge-device/commit/8fbb456de850cea6caa0e3ca5ea94b29d24e91a4))
- forgot to hydrate tableAssignments during setCurrentGame ([04ce075](https://github.com/timheilman/scorebridge-device/commit/04ce075915fa8ebcb8cefede526b2ffecfcd5569))
- found bug w/chooseLead's rank setting type to null ([84b558e](https://github.com/timheilman/scorebridge-device/commit/84b558eed36a3d2db80b4d47c504e32471bbf907))
- got the unassignPlayers button back on ios. Ready to do submit button ([188c4dd](https://github.com/timheilman/scorebridge-device/commit/188c4dd0b6a0dd0c94cdc430b1206c02e733943e))
- hard crash when malformed regexp entered in player search ([40d9cfb](https://github.com/timheilman/scorebridge-device/commit/40d9cfbf6b0d379b4ebf0407e6bee8dd9e151a29))
- hopefully, retrying on timeout for all gql issued will fix the infinite spinny ([a08a4fe](https://github.com/timheilman/scorebridge-device/commit/a08a4fe35ba6149a94e4043fbe47835cb97371e0))
- improve contrast on purple by lightening orange ([da556be](https://github.com/timheilman/scorebridge-device/commit/da556be041661b460b9ff51b945b9d040ecdcd12))
- infinite blue card spinny ([fa17c83](https://github.com/timheilman/scorebridge-device/commit/fa17c83ef421e2b40a4f9cb5cf250a593743fb2a))
- ios player list obscured by keyboard ([4cde5cb](https://github.com/timheilman/scorebridge-device/commit/4cde5cbc8aeaacb16bde54a37335c702501c0ed6))
- Kick Subscriptions In Head tooling, after 35 seconds of failed gql retries ([b50f5f0](https://github.com/timheilman/scorebridge-device/commit/b50f5f0579bf7f712f9b792ddd2cad446e98b6f3))
- kickSubscriptionsInHeadKey was not being called, but all actions need to ([a8bfe23](https://github.com/timheilman/scorebridge-device/commit/a8bfe2308d8b3e0c0e34e3b59008c231a9141770))
- let board selection wrap after 5 boards, delete done todos ([66c0f12](https://github.com/timheilman/scorebridge-device/commit/66c0f127125772a0a3f115cdba253005c60f13fd))
- logging for contract selection buttons, still have a perf issue ([9781a3a](https://github.com/timheilman/scorebridge-device/commit/9781a3a8e122d7935e7f9f787f3c259b1e09c555))
- make just wifi icon red when network goes out; fix refetch to clear spinnies ([12dd629](https://github.com/timheilman/scorebridge-device/commit/12dd629b551ff5ceaa157ee7a1995707de2318ea))
- make non-played results go to the same page as played results ([65c41e6](https://github.com/timheilman/scorebridge-device/commit/65c41e693191e2c0ca35fb654ac96d11b5251536))
- make ScreenBoardCompleted better on small screens ([9ea1e7c](https://github.com/timheilman/scorebridge-device/commit/9ea1e7c37a02bfeade1d42e66d6c3e7ffe436309))
- make size of down/made icons consistent across screens ([3008e80](https://github.com/timheilman/scorebridge-device/commit/3008e802d473844bf400b02c4ab703c5946c788b))
- missed update of the enum change ([d7ad013](https://github.com/timheilman/scorebridge-device/commit/d7ad013009e23d287091e00acb4955cb9945f4e7))
- move more stuff from device to submodule ([cddaf16](https://github.com/timheilman/scorebridge-device/commit/cddaf1629a912a37eae583e4b54e6cfa6b48ea67))
- move unconfirmPlayerAssignments button to selectBoard screen ([05c95ee](https://github.com/timheilman/scorebridge-device/commit/05c95eeffef701e0a0ec5b1ab344f0476148dfe4))
- multi-table board/round calculations were wrong, needed ([8cb9648](https://github.com/timheilman/scorebridge-device/commit/8cb9648514369d7e0d18e88462acf9530515f130))
- must provide gameId in live update, will need a new aab ([de32204](https://github.com/timheilman/scorebridge-device/commit/de32204739a8c52d876a50f57c4ce9cda0218884))
- name the app BridgeFridge not ScoreBridge8 ([86db793](https://github.com/timheilman/scorebridge-device/commit/86db79360a94631c1d8cd33f0ddc786d5f35f106))
- nav tab error for /BoardN ([c30e019](https://github.com/timheilman/scorebridge-device/commit/c30e01958125020dad9772d391f599768abc8b38))
- network route at end game, by drying tabs/\_layout to useRedirectionRoute ([4f0e7a6](https://github.com/timheilman/scorebridge-device/commit/4f0e7a678b759d39519eccac5f374b419d9fb1d7))
- no board warning header on confirmRound if boards stay at table ([09be0a2](https://github.com/timheilman/scorebridge-device/commit/09be0a2a8241085ed74f8749a8e5bc55aebfbaec))
- null pointer exception when game deleted at webapp ([08c557f](https://github.com/timheilman/scorebridge-device/commit/08c557fec4a42d3f2f9d07be1a46b86db433124b))
- onCreateGame snafu, modern ios tablets statusBar overlay, some style fixes ([fd6dd81](https://github.com/timheilman/scorebridge-device/commit/fd6dd819b8b4fc63a228343ec389b3ded71f4f33))
- onlineStatus was never returning downIcon ([b58e7c3](https://github.com/timheilman/scorebridge-device/commit/b58e7c38b11b932669405557dd9defe362eefb31))
- oops and actually import them ([ca1fbbb](https://github.com/timheilman/scorebridge-device/commit/ca1fbbbc56fdf37ecc986d4f6da3310503d3f2b2))
- oops failed to add matchPointsScore ([c5ece8d](https://github.com/timheilman/scorebridge-device/commit/c5ece8d5b5a3986bffc4a7b6b15e5aaa7b569bf1))
- pass movement to inversePlayerNumber, and memoize it and whereWasI ([e0e7344](https://github.com/timheilman/scorebridge-device/commit/e0e7344779361035ff04070d97da7f6ba5850394))
- perhaps kick subscriptions in head fix was never working, needed () on the action ([0cedc6e](https://github.com/timheilman/scorebridge-device/commit/0cedc6e88087c0208a4c07998f4bea3888b12686))
- player names were only correct for first table; style: tidy ([97930eb](https://github.com/timheilman/scorebridge-device/commit/97930ebb00632fa642f4357dfb4f3e50bfd50e1c))
- problems with backend out-of-sync with frontEnd, kick back to ([ac55e4b](https://github.com/timheilman/scorebridge-device/commit/ac55e4b11a22b5a500cf4cd9d277702635be0314))
- put key on board complete screen directions, remove club name from top ([5994dec](https://github.com/timheilman/scorebridge-device/commit/5994dec0c77417dc3271056b9e7db25e91c2e119))
- race condition during unassignment, and feat: eliminate flash ([16ad95e](https://github.com/timheilman/scorebridge-device/commit/16ad95e4fd1aab6ecfcaf9c8a169a3a7165075a3))
- reloading while at board result selection led to blank screen ([79f4ce4](https://github.com/timheilman/scorebridge-device/commit/79f4ce41073afe2496f88b60567cde8b21880735))
- remove activityOverlay from ActivityButton and rename ActionButton ([1aa6080](https://github.com/timheilman/scorebridge-device/commit/1aa6080251acbae81970b6ec8db61ef7505430e6))
- remove optimistic update of assignPlayers ([49f4c8b](https://github.com/timheilman/scorebridge-device/commit/49f4c8bb3128bccf37d45725d60d3e76379f4715))
- remove optimistic update of assignTable ([fc0435a](https://github.com/timheilman/scorebridge-device/commit/fc0435a94951bc62acef691e784f4d03c8a904f5))
- remove optimistic update of confirmTable ([8a49562](https://github.com/timheilman/scorebridge-device/commit/8a495626251fd1cb227ea6b0024219b9497e9df6))
- remove optimistic update of unassignTable ([91b1219](https://github.com/timheilman/scorebridge-device/commit/91b121943ac18bec5374d4b53b4ab50949f15d43))
- removing optimistic update of setRound ([a3b642d](https://github.com/timheilman/scorebridge-device/commit/a3b642dda19f47e55cb042fab617e155a03564b4))
- returning found false is itself falsy, notate other problems ([735e45d](https://github.com/timheilman/scorebridge-device/commit/735e45d4cab1800f1848b5fe7bca27eb81bafb65))
- revamp round and board settings, consume more granular ([edcec08](https://github.com/timheilman/scorebridge-device/commit/edcec088932aab0d5a02aa86a1bff72f7967e17d))
- revert metro.config.js and tsconfig.json to expo-documented defaults ([5692fa0](https://github.com/timheilman/scorebridge-device/commit/5692fa0318d6a4031cc1dbdf5f04f5de5e3beecc))
- rotate splash screen correctly ([8a33a6a](https://github.com/timheilman/scorebridge-device/commit/8a33a6ad9ad8c8bf6ea64e5367ada22a13105fff))
- round advance on zeroth round, also: ([1a5d765](https://github.com/timheilman/scorebridge-device/commit/1a5d765445f81a51d05e3755e45de818d3c029c2))
- route back to correct screen if new game is created or different game is selected in webapp ([bf53850](https://github.com/timheilman/scorebridge-device/commit/bf5385041aba0a9b1294c1bc9c92084470a68c9d))
- SCOR-115 .gitmodules had had no branch = main for ([7d6aada](https://github.com/timheilman/scorebridge-device/commit/7d6aada0065dd5b9489dc608023c8d9def2588a0))
- SCOR-132 dependabot security fix regarding axios ([f35040c](https://github.com/timheilman/scorebridge-device/commit/f35040c83edbbae5ec98c2eb454c1e0231669198))
- SCOR-143 completed upgrade to amplify v6, which ([4811d80](https://github.com/timheilman/scorebridge-device/commit/4811d80a6ff31f38602c73820f2fb5d1ec029860))
- scor-185 player assignment screen became purple vertical line ([1201c95](https://github.com/timheilman/scorebridge-device/commit/1201c9546d36a024ef311b342786fee7b5fbd6b0))
- scor-211 do not crash if no board result returned ([b714a45](https://github.com/timheilman/scorebridge-device/commit/b714a457d40a9687ad87d83fa53aac035928812e))
- scor-211 forgot to set round upon player confirm ([716f4da](https://github.com/timheilman/scorebridge-device/commit/716f4da40284bb6a66f584999aab86e1f7287b19))
- scor-211 re-consume confirmTable and optimistic updates thru assignTable ([5cb47d8](https://github.com/timheilman/scorebridge-device/commit/5cb47d8a3d6ca94e07f8db7926896140f28975fc))
- scor-222 on second thought do wait for setRound status, to disable button meantime ([8dddd18](https://github.com/timheilman/scorebridge-device/commit/8dddd18f407fb64c4d372ac52d8a6b52fcee07ef))
- scor-232 do not cut off the final round ([c6ed8aa](https://github.com/timheilman/scorebridge-device/commit/c6ed8aae7f8de0f4679b839962688ad17be25d6d))
- scoring bug with pass-out scores ([086bef4](https://github.com/timheilman/scorebridge-device/commit/086bef48ccb981bed90c345f07ec9485ea8f6116))
- shallow equal with null for boardConfirm cloud sync screen ([62a7f8f](https://github.com/timheilman/scorebridge-device/commit/62a7f8fcc695a740bd047b60b34c23ed2dd63c5f))
- shorten button names, overflow on android phone ([fc67b9b](https://github.com/timheilman/scorebridge-device/commit/fc67b9bea5b863bac00f60579c50f1c59f18b090))
- small problem with unconfirmedPlayerNames null-out being propagated to child before parent ([66a943f](https://github.com/timheilman/scorebridge-device/commit/66a943f0bad85d0a15ae676dbb8f2405636565fe))
- sometimes acutalHeight/actualWidth not available, backoff to iconSize ([9c6d61a](https://github.com/timheilman/scorebridge-device/commit/9c6d61a05fc8608d73bac697fd3823376338bff0))
- statusBar style set to light per expo issue 30497 ([656b7a2](https://github.com/timheilman/scorebridge-device/commit/656b7a2e817f09baf3907e304e55ac70b05d1d34))
- strangely seemed to need an import update well after submodule update ([89dfb9c](https://github.com/timheilman/scorebridge-device/commit/89dfb9c68946ad44c1fb4c2900d9791897d865d2))
- subscriptions infinite loop, bite bullet and go with ([8129c20](https://github.com/timheilman/scorebridge-device/commit/8129c209f1c0aa4c646414347f805b485923f992))
- tableNumber is not part of BoardResult, and want a spinny on ([dbccab2](https://github.com/timheilman/scorebridge-device/commit/dbccab206c28d92cdd15893587b4a986b56f70e1))
- too-big fancy board icon ([450be49](https://github.com/timheilman/scorebridge-device/commit/450be494369fe8571a911869a21364bec905910c))
- typo Rounded instead of round ([be4c29e](https://github.com/timheilman/scorebridge-device/commit/be4c29e68b80f8743a62d8e7a81f4bb749d4ea77))
- unconfirm board result when a nonPlayed result ([f23139d](https://github.com/timheilman/scorebridge-device/commit/f23139d590780b4fc60d81348ce0d12800754bae))
- update submodule to not-overwrite failed-at-init connection statuses ([a0044b4](https://github.com/timheilman/scorebridge-device/commit/a0044b4ca0fc04fc808284cd12196359fdf74a13))
- update SubscriptionsComponent to handle null updateCurrentGameId ([516f002](https://github.com/timheilman/scorebridge-device/commit/516f002bd3957239d52accb158a76590c06897d2))
- use table confirm nav bar icon on that screen ([0af35a9](https://github.com/timheilman/scorebridge-device/commit/0af35a9faa0ae46c93413eb94b0ae24e795937ff))
- when board is >10 still show board number on board completed screen for skipped or passed-out boards ([14d097c](https://github.com/timheilman/scorebridge-device/commit/14d097c5786067b0cd50b89108a8139a6b42a6b0))
- wrap getGame in retryOnTimeoutGqlPromise, first consumption, corresponds ([a0e40eb](https://github.com/timheilman/scorebridge-device/commit/a0e40ebb48ede0085109d132f1ed71aaa1530a2e))
- wrong formatting for shared board selection w/multi-digit ([d761e6c](https://github.com/timheilman/scorebridge-device/commit/d761e6c4eec2bbae9361d71512f74fbc6ea9a11a))
