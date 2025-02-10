import reactConfig from "@playnest/eslint-config/react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactConfig,
  {
    ignores: [
      "dist/*",
      "node_modules/*",
      ".turbo/*",
      ".next/*",
      "*.config.mjs",
      "*.config.js",
      "*.config.mts",
      "*.config.ts"
    ]
  },
  {
    languageOptions: {
      parserOptions: { project: "./tsconfig.app.json" }
    }
  }
];
