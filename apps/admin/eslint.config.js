import reactConfig from "@playnest/eslint-config/react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  {
    languageOptions: {
      parserOptions: { project: "./tsconfig.app.json" }
    }
  }
];
