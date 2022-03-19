FROM node:12 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG NEXT_PUBLIC_API_URI
ARG SENTRY_DSN
ARG SENTRY_APM
ARG DEMO_MODE
ARG GTM_ID
ENV NEXT_PUBLIC_API_URI ${NEXT_PUBLIC_API_URI:-http://localhost:8000/graphql/}
RUN NEXT_PUBLIC_API_URI=${NEXT_PUBLIC_API_URI} npm run build:export

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /app/
