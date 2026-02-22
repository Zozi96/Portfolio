# Build stage - use Node.js official image for building
FROM node:24-bookworm-slim AS builder

# Build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_API_KEY
ARG VITE_USE_MOCK_SERVICES
ARG VITE_ENABLE_ANALYTICS
ARG VITE_GOOGLE_ANALYTICS_ID

# Make them available as environment variables during the build
ENV VITE_API_URL=$VITE_API_URL \
    VITE_API_KEY=$VITE_API_KEY \
    VITE_USE_MOCK_SERVICES=$VITE_USE_MOCK_SERVICES \
    VITE_ENABLE_ANALYTICS=$VITE_ENABLE_ANALYTICS \
    VITE_GOOGLE_ANALYTICS_ID=$VITE_GOOGLE_ANALYTICS_ID

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

# Production stage – nginx with Brotli module pre-compiled
FROM fholzer/nginx-brotli:latest

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000