import { reactConfig } from "@playnest/configs/eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  {
    languageOptions: {
      parserOptions: { project: "./tsconfig.app.json" }
    }
  }
];
