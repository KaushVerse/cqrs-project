# Base image
FROM node:20-alpine

# App directory
WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source
COPY . .

# Env
ENV NODE_ENV=production

# App port
EXPOSE 3000

# Start app
CMD ["node", "src/server.js"]
