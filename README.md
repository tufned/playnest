This is a monorepo built using `Turborepo`.

# Apps and Packages

- `apps/api`: Express.js + Prisma ORM
- `apps/shop`: Next.js + Redux-toolkit
- `apps/admin`: React.js + Zustand
- `packages/core`: shared library for all apps (shop, admin and api); published on npm
- `packages/web`: shared library for frontend apps (shop and admin)
- `packages/configs`: typescript, eslint, prettier configurations; published on npm

---

- All apps and packages are 100% TypeScript (except `packages/configs` and tests)
- All apps are using `Vitest` for testing
- Tests are located in nested `__tests__` folders and written in JavaScript
- `PostgreSQL` as a database provider
- `Husky` and `lint-staged` are used for pre-commit hook
- `GitHub Actions` for CI

# How To Launch

Short answer:

```bash
pnpm dev
```

Explanatory answer:

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
pnpm add --save-dev typescript --filter @playnest/api
```

## Step 2

Install all dependencies:

```bash
pnpm install
```

## Step 3

Create `.env` files in each app:

## Step 4

Apply existing `Prisma` migrations:

```bash
pnpm prisma:deploy
```

## Final Step

To start all apps and packages in dev mode:

```bash
pnpm dev
```

To develop `shop` (omits `admin`):

```bash
pnpm dev:shop
```

To develop `admin` (omits `shop`):

```bash
pnpm dev:admin
```

To develop _only_ `api`:

```bash
pnpm dev:api
```

# Deployment

- `apps/shop` - Vercel
- `apps/admin` - Vercel
- DB (`PostgreSQL`) - Supabase
- `apps/api` - Railway

To build docker container for `apps/api`:

```bash
docker build -t playnest -f apps/api/Dockerfile .
```

To run created container:

```bash
docker run -p 3030:3030 playnest
```

# Contributing

1. Create an **issue**. Assign yourself
2. Create a **new branch** from `dev` branch. Every branch name should start with task number and contain short
   description. e.g. **125-navbar-fix**
3. Commit changes
4. Create a **pull request**
5. Link pull request to an issue
6. **Squash and merge** into `dev` branch
7. **Delete** task branch (e.g. **125-navbar-fix**)

test
