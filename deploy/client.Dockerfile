# syntax = docker/dockerfile:1.3.0

FROM node:16.13.1-alpine3.12 AS build

WORKDIR /app/

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install -g yarn

COPY ./package.json ./yarn.lock ./
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/
RUN --mount=type=cache,target=/usr/src/app/.yarn \
  yarn config set cache-folder /usr/src/app/.yarn && \
  yarn install --frozen-lockfile && \
  rm -rf /app/server

COPY ./client ./
RUN yarn build

FROM caddy:2.4.6-alpine

COPY --from=build /app/dist /usr/share/caddy/dist
COPY ./public /usr/share/caddy/public
COPY ./docker/Caddyfile /etc/caddy/Caddyfile

ENTRYPOINT ["caddy"]
CMD ["run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
