FROM node:14-alpine AS build

RUN apk upgrade

WORKDIR /usr/local/src/jsc-se-game
COPY .eslintrc.json .
COPY .prettierrc.js .
COPY index.html .
COPY package.json .
COPY tsconfig.json .
COPY vite.config.ts .
COPY yarn.lock .
COPY src src
COPY public public

RUN yarn && yarn build

FROM nginx:1.9.15-alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/local/src/jsc-se-game/dist/assets assets
COPY --from=build /usr/local/src/jsc-se-game/dist/index.html .
