FROM node:15.14.0 AS build-env
WORKDIR /build

# Add project files to /app route in Container
COPY . ./
RUN yarn install && yarn build

FROM nginx:1.19.10-alpine
COPY --from=build-env /build/dist /usr/share/nginx/html/
