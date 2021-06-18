# FROM node:12 as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ARG API_URI
# ARG SENTRY_DSN
# ARG SENTRY_APM
# ARG DEMO_MODE
# ARG GTM_ID
# ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
# ENV PORT ${PORT:-3000}
# RUN API_URI=${API_URI} npm run build:start

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

CMD ["npm", "run", "start:heroku"]


# FROM nginx:stable
# WORKDIR /app
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/ /app/
# CMD ["npm", "run", "start:heroku"]
