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
FROM node:16.13.2  as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install @vue/cli -g
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
