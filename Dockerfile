# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build NestJS app
RUN npm run build

EXPOSE 3000