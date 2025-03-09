# Use official Node.js image as base
FROM node:18-alpine AS build-stage
WORKDIR /app

# Install dependencies and build the app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --prefer-offline

COPY . .
RUN npm run build

# Use Nginx for serving the built application
FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/dist/url-shorten /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  # Start Nginx to serve the app
