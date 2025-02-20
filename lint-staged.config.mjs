export default {
  "apps/api/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@playnest/api --",
  ],
  "apps/web/**/*.{js,jsx,ts,tsx}": [
    "pnpm format",
    "turbo lint --filter=@playnest/shop --",
  ],
  "packages/core/src/**/*.{js,ts}": [
    "pnpm format",
    "turbo lint --filter=@playnest/core --",
  ],
  "packages/web/src/**/*.{js,ts,jsx,tsx}": [
    "pnpm format",
    "turbo lint --filter=@playnest/web --",
  ],
  "**/*.{json,md,config.js,config.mjs,yaml,yml}": ["prettier --write"],
};
