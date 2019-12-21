FROM node:10 as builder
WORKDIR /app
COPY package*.json ./
RUN apt-get update \
  && apt-get install -yq libgl1-mesa-dev nasm git gcc autoconf automake libpng-dev
RUN npm install
COPY . .
ARG API_URI
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}

RUN echo $API_URI && API_URI=${API_URI} npm run build

FROM nginx:stable
WORKDIR /app
COPY --from=builder /app/dist/ /app/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

