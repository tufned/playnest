This is a monorepo built using `Turborepo`.

# Apps and Packages

- `@playnest/api`: Express.js app
- `@playnest/mobile`: React Native app
- `@playnest/web`: Next.js app
- `@playnest/utils`: library shared by frontend, mobile and backend
- `@playnest/slint-config`: `eslint` configurations
- `@playnest/typescript-config`: `typescript` configurations
- `@playnest/prettier-config`: `prettier` configuration

Each app and `utils` package is 100% [TypeScript](https://www.typescriptlang.org/).

# How To Launch

## Step 1

This project uses `pnpm` package manager.  
If you don't have it installed on your machine, run the following command:

```bash
npm i -g pnpm
```

To install new packages or run any command from `package.json` always use `pnpm` instead of `npm`.  
For installing packages also add `--filter` flag to specify workspace.

Example:

```
pnpm add --save-dev typescript --filter @playnest/web
```

## Step 2

Install all dependencies:

```bash
pnpm install
```

## Step 3

To start all apps and packages in dev mode:

```bash
pnpm dev
```

To develop web (omits mobile):

```bash
pnpm dev:web
```

To develop mobile (omits web):

```bash
pnpm dev:mobile
```
