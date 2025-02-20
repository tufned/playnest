FROM node:18-alpine AS base

# Stage 1: Prune Unnecessary Files
FROM base AS pruner
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm i -g turbo

# Copy the full monorepo so `turbo prune` can analyze dependencies
COPY . .

# Prune the monorepo to keep only what's needed for the `api` app
RUN turbo prune @playnest/api --docker

# Stage 2: Build
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm i -g pnpm turbo

# Copy the pruned source code from the pruner stage
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/out/json/ .

RUN pnpm install --frozen-lockfile --ignore-scripts --shamefully-hoist
RUN pnpm prisma:generate
RUN pnpm build

# Stage 3: Install Production Dependencies
FROM base AS installer-prod
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm i -g pnpm

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/full/apps/api/prisma /app/apps/api/prisma

# Install only production dependencies
RUN pnpm i --frozen-lockfile --ignore-scripts --only=production --shamefully-hoist
RUN pnpm prisma:generate

# Stage 4: Run
FROM base AS runner

WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=installer-prod /app/node_modules /app/node_modules
COPY --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --from=builder /app/node_modules/@playnest/core/dist /app/node_modules/@playnest/core/dist

WORKDIR /app/apps/api

# Expose api port
EXPOSE 3030

# Start the api server
CMD ["node", "dist/app.js"]
