import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import baseConfig from "@playnest/eslint-config/base";
import reactPlugin from "eslint-plugin-react";
import reactRules from "./react-rules.js";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(...baseConfig, {
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    "react-hooks": reactHooks,
    react: reactPlugin,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...reactRules,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
