# README for the tsconfig.json

Configuring typescript is difficult. Unfortunately, `tsconfig.json`, as a json file, does not allow inline comments. This file was created to provide those comments alongside the complex configuration.

This repository is shared code among (at least) bridgefridge-cloud (NodeJS) and scorebridge-device (bundled with Metro via Expo). Hence, the official typescript guide that seems most applicable to this repo is the ["I'm writing a library"](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html#im-writing-a-library) guide. That is the starting point for this `tsconfig.json` file.

## compilerOptions

### module

The [most basic docs](https://www.typescriptlang.org/tsconfig/#module) for this setting say:

> You very likely want "nodenext" for modern Node.js projects and preserve or esnext for code that will be bundled.

But we're in a bind since this shared code will be used by both bundled and NodeJS projects. On the other hand, the ["I'm writing a library"](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html#im-writing-a-library) guide recommends "node18", saying:

> When a codebase is compatible with Node.js’s module system, it almost always works in bundlers as well

I decided to combine these recommendations, and landed on "nodenext".

The [official theory docs](https://www.typescriptlang.org/docs/handbook/modules/theory.html#the-module-output-format) are good reading and nothing jumps out at me to indicate "nodenext" is a bad choice.

Proceeding with the ["I'm writing a library"](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html#im-writing-a-library) guide's "module" commentary:

> If you’re using a third-party emitter to emit ESM outputs, ensure that you set "type": "module" in your package.json so TypeScript checks your code as ESM, which uses a stricter module resolution algorithm in Node.js than CommonJS does.

Unfortunately at this time this "library" is not emitting anything, since it is a submodule and the javascript emission occurs in bridgefridge-cloud (NodeJS) and scorebridge-device (bundled with Metro via Expo). I'm not sure whether Metro is emitting ESM outputs or not, but it isn't targeting NodeJS.

Nonetheless, it's best practice to have a package.json file even when it's only a submodule, so now is as good a time as any to get 'er done.

### target
