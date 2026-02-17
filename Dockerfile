# Build stage - use Node.js official image for building
FROM node:24-bookworm-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Production stage - use node bookworm-slim as requested
FROM node:24-bookworm-slim

# Install serve to serve static files
RUN npm install -g serve@14.2.5

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 80
EXPOSE 80

# Serve the application
CMD ["serve", "-s", "dist", "-l", "80"]
