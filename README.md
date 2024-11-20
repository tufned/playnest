This is a monorepo built using `Turborepo`.

## Apps and Packages

- `@playnest/api`: Express app
- `@playnest/mobile`: React Native app
- `@playnest/utils`: library shared by both `api` and `mobile` applications
- `@playnest/slint-config`: `eslint` configurations
- `@playnest/typescript-config`: `typescript` configurations
- `@playnest/prettier-config`: `prettier` configuration

Each app and `utils` package is 100% [TypeScript](https://www.typescriptlang.org/).

## To Launch In Dev Mode

To develop all apps and packages, run the following command:

```
npm run dev
```
