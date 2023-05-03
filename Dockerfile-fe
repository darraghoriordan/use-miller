# A container with pnpm and python3 is required
FROM node:18-alpine as pnpm_base

WORKDIR /app
RUN npm i --global --no-update-notifier --no-fund pnpm@7
RUN apk add --no-cache g++ make py3-pip libc6-compat

# run fetch in a separate step to avoid re-fetching deps on every change
FROM pnpm_base as fetched_deps
WORKDIR /app
ENV NODE_ENV production
COPY pnpm-lock.yaml ./
RUN pnpm config set store-dir /workdir/.pnpm-store
RUN pnpm fetch

# install all deps from cache
FROM fetched_deps as with_all_deps
COPY . ./
RUN pnpm install --offline

# Build the FE
FROM with_all_deps as builder
RUN pnpm --filter='*frontend' build
RUN pnpm --filter='*frontend' deploy pruned --prod

# Production image - only take pruned assets
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app

COPY --chown=app:app --from=builder /app/apps/frontend/.next/standalone src/
COPY --chown=app:app --from=builder /app/apps/frontend/public src/apps/frontend/public
COPY --chown=app:app --from=builder /app/apps/frontend/.next/static src/apps/frontend/.next/static
# COPY --chown=app:app --from=builder /app/pruned/node_modules node_modules
EXPOSE 5000
ENV PORT 5000

CMD ["node", "src/apps/frontend/server.js"]
#CMD ["ls", "-la"]
