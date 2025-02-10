import nodeConfig from "@playnest/eslint-config/node";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nodeConfig,
  { ignores: ["dist/*", "node_modules/*", ".turbo/*"] },
  {
    languageOptions: {
      parserOptions: { project: "./tsconfig.json" }
    }
  }
];
