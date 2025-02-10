import reactConfig from "@playnest/eslint-config/react";

export default [
  ...reactConfig,
  {
    ignores: ["dist/*", "node_modules/*", ".turbo/*"]
  },
  {
    languageOptions: {
      parserOptions: { project: "./tsconfig.json" }
    }
  }
];
