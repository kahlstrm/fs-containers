FROM node:16 as base
WORKDIR /usr/src/app

COPY . .

FROM base as test-stage

RUN npm ci

RUN CI=TRUE npm test

FROM test-stage as build-stage

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
