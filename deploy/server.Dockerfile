FROM node:16.13.1-alpine3.12

WORKDIR /app

COPY ./package.json ./yarn.lock ./
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/
RUN --mount=type=cache,target=/usr/src/app/.yarn \
  yarn config set cache-folder /usr/src/app/.yarn && \
  yarn install --frozen-lockfile && \
  rm -rf /app/client

COPY ./server ./server

CMD yarn start
