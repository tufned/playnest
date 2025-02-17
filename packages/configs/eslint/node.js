import globals from "globals";
import baseConfig from "./base.js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(...baseConfig, {
  languageOptions: { globals: globals.node },
});
