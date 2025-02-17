import tseslint from "typescript-eslint";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import reactConfig from "./react.js";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(...reactConfig, {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...nextPlugin.configs.recommended.globals,
    },
  },
  plugins: {
    "@next/next": nextPlugin,
  },
  rules: {
    // Next.js rules
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "error",
    "@next/next/no-head-element": "error",
    "@next/next/no-unwanted-polyfillio": "warn",
    "@next/next/no-sync-scripts": "error",
    "@next/next/no-document-import-in-page": "error",
    "@next/next/no-title-in-document-head": "error",
    "@next/next/google-font-display": "error",
    "@next/next/no-page-custom-font": "error",
  },
  settings: {
    next: {
      rootDir: ".",
    },
  },
});
