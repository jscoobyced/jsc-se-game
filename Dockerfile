FROM node:14-alpine AS build

WORKDIR /usr/local/src/jsc-se-game
COPY code/*.?s* ./
COPY code/index.html .
COPY code/yarn.lock .
COPY code/src src
COPY code/public public

RUN yarn && yarn build

FROM nginx:1.9.15-alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/local/src/jsc-se-game/dist/assets assets
COPY --from=build /usr/local/src/jsc-se-game/dist/index.html .
