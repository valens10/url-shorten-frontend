# Use official Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --prefer-offline

# Copy project files
COPY . .

# Expose Angular's default development port
EXPOSE 4200

# Run Angular development server
CMD ["npm", "run", "start"]
