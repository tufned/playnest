import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierOptions from "../prettier/prettier.config.js";
import tseslintParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "dist/*",
      "node_modules/*",
      ".turbo/*",
      ".next/*",
      "*.config.mjs",
      "*.config.js",
      "*.config.mts",
      "*.config.ts",
    ],
  },
  { files: ["**/*.{ts,tsx}"] },
  {
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: ["tsconfig.json"],
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ["**/*.{js,jsx}", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  {
    rules: {
      "prettier/prettier": ["warn", prettierOptions],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "prefer-const": "off",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 2,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
