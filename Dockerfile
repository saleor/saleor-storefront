FROM node:12 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_URI
ARG SENTRY_DSN
ARG SENTRY_APM
ARG DEMO_MODE
ARG GTM_ID
ENV API_URI ${API_URI:-http://172.16.11.19:8080/graphql/}
RUN API_URI=${API_URI} npm run build:export

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /app/
