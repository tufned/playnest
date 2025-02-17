export default {
  "apps/api/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@playnest/api --",
  ],
  "apps/web/**/*.{js,jsx,ts,tsx}": [
    "pnpm format",
    "turbo lint --filter=@playnest/shop --",
  ],
  "packages/utils/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@playnest/shared --",
  ],
  "**/*.{json,md,config.js,config.mjs,yaml,yml}": ["prettier --write"],
};
