#FROM node:16.13.2-bullseye-slim AS build
#WORKDIR /app
#COPY . .
#RUN npm install @vue/cli -g
#RUN npm install -g http-server
#
#RUN npm run build -- --port 80
#
#EXPOSE 80/tcp
#EXPOSE 443/tcp
#
#CMD ["http-server", "dist"]

# build stage
#FROM node:16.13.2-bullseye-slim  as build-stage
FROM node:16.13.2-bullseye-slim@sha256:0f35ef0fa878eb2684aedaa779cbfb73f1db7bcf75b76508782ba48a9e4050d7  as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
#FROM nginx:stable-alpine as production-stage
FROM nginx:latest@sha256:bb129a712c2431ecce4af8dde831e980373b26368233ef0f3b2bae9e9ec515ee as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
