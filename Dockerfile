# Dependency step only gets rebuilt if needed
FROM node:14 AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:14 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:14 AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --gid 1001 nextjs

# COPY --from=builder /app/ .
# RUN chown nextjs:nodejs /app/.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/config/ ./config
# COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV API_URI ${API_URI:-https://saleor-core-gqqct.ondigitalocean.app/graphql/}
ENV PORT ${PORT:-3000}

EXPOSE $PORT

CMD ["npm", "run", "start:digitalocean"]