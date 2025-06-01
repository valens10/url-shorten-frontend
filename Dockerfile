# Build and serve Angular app
FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the app with production configuration
ENV NODE_ENV=production
RUN npx ng build --configuration=production

# Install serve to run the built app
RUN npm install -g serve

# Create start script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "window.__env = { API_URL: \"$API_URL\" };" > /app/dist/url_shorten/browser/assets/env.js' >> /app/start.sh && \
    echo 'serve -s /app/dist/url_shorten/browser -l 4200' >> /app/start.sh && \
    chmod +x /app/start.sh

# Expose port 4200
EXPOSE 4200

# Start the app with environment variable handling
CMD ["/bin/sh", "/app/start.sh"]
