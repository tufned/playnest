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
pnpm dev:shop
```

To develop mobile (omits web):

```bash
pnpm dev:mobile
```

# Contributing

1. Create an **issue**. Assign yourself
2. Create a **new branch** from `dev` branch. Every branch name should start with task number and contain short description. e.g. **125-navbar-fix**
3. Commit changes
4. Create a **pull request**
5. Link pull request to an issue
6. **Squash and merge** into `dev` branch
7. **Delete** task branch (e.g. **125-navbar-fix**)
