// @ts-check

import appsync from "@aws-appsync/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginJest from "eslint-plugin-jest";
import reactPlugin from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["eslint.config.mjs", "dist/**"],
  },
  ...defineConfig(
    // @ts-ignore
    {
      files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
      // @ts-ignore
      ...reactPlugin.configs.flat.all,
      // @ts-ignore
      ...reactPlugin.configs.flat["jsx-runtime"],
    },
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      rules: {
        "@typescript-eslint/restrict-template-expressions": [
          "error",
          { allowNumber: true },
        ],
      },
    },
    {
      plugins: {
        "simple-import-sort": simpleImportSort,
      },
      rules: {
        "sort-imports": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
      },
    },
    {
      files: ["**/*-test.ts", "**/*-test.tsx"],
      plugins: pluginJest.configs["flat/recommended"].plugins,
      languageOptions: pluginJest.configs["flat/recommended"].languageOptions,
      rules: {
        ...pluginJest.configs["flat/recommended"].rules,
        ...pluginJest.configs["flat/style"].rules,
      },
    },
    {
      files: ["**/*.cjs", "**/*.js"],
      extends: [tseslint.configs.disableTypeChecked],
      languageOptions: {
        sourceType: "commonjs",
        globals: {
          ...globals.node,
        },
      },
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
    {
      files: ["**/*.mjs"],
      extends: [tseslint.configs.disableTypeChecked],
      languageOptions: {
        sourceType: "module",
        // globals: {
        //   ...globals.node,
        //   ...globals.amd,
        // },
      },
    },
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        "react-hooks": eslintPluginReactHooks,
        // @ts-ignore
        "react-native": fixupPluginRules(reactNative),
      },
      rules: {
        ...eslintPluginReactHooks.configs.recommended.rules,
        ...{
          ...reactNative.configs.all.rules,
          "react-native/no-raw-text": [
            "error",
            { skip: ["AppText", "AppHeader", "AppRealBig"] },
          ],
        },
      },
    },
    testingLibrary.configs["flat/react"],
    // @ts-ignore
    {
      files: ["graphql/inputValidation/*.ts"],
      // @ts-ignore
      ...appsync.configs.recommended,
      rules: {
        // not allowed in appsync js runtime:
        "@typescript-eslint/prefer-nullish-coalescing": "off",
      },
    },
  ),
];
