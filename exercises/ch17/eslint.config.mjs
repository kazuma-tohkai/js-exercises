import globals from "globals";
import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
import google from "eslint-config-google";
import prettier from "eslint-config-prettier";

// eslint-config-googleはESLint9に対応していないため、以下の設定を削除する
// https://stackoverflow.com/questions/78882167/how-can-i-use-eslintrecommended-and-google-in-eslint-9-with-commonjs-syntax
// https://github.com/google/eslint-config-google/commit/3ae571a6a255ee5b03f208295dd964c5cdfba739
delete google.rules["valid-jsdoc"];
delete google.rules["require-jsdoc"];

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  google,
  prettier,
  {
    ignores: [
      "ex01/format_sample.js",
      "ex05/dist/production/*",
      "ex05/dist/development/*",
      "ex08/*",
      "ex09/*",
    ],
  },
];
