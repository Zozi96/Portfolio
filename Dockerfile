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
FROM ghcr.io/macbre/nginx-http3:mainline

# Argumento para el puerto con valor por defecto 3000
ARG PORT=3000

# Variable de entorno para el puerto
ENV PORT=$PORT

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx template (auto-substitutes ${PORT} at container startup)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Expose el puerto dinámicamente
EXPOSE $PORT