export default {
  "apps/api/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@playnest/api --",
  ],
  "apps/web/**/*.{js,jsx,ts,tsx}": [
    "pnpm format",
    "turbo lint --filter=@playnest/web --",
  ],
  "packages/utils/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@playnest/utils --",
  ],
  "**/*.{json,md,config.js,config.mjs,yaml,yml}": ["prettier --write"],
};
