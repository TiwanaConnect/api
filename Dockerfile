# Use the latest LTS Node.js image
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate client early (optional but safer for caching)
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# Build NestJS (assumes your project uses `dist/`)
RUN npm run build

# Add wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose the app port
EXPOSE 4000
