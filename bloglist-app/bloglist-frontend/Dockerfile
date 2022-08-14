FROM node:16 as base
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci
FROM base as build-stage
COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3001

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html