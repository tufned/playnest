import globals from "globals";
import baseConfig from "@playnest/eslint-config/base";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(...baseConfig, {
  languageOptions: { globals: globals.node },
});
