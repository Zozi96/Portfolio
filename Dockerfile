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

# Production stage - use node bookworm-slim as requested
FROM node:24-bookworm-slim

# Argumento para el puerto con valor por defecto 3000
ARG PORT=3000

# Install serve to serve static files
RUN npm install -g serve@14.2.5

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Variable de entorno para el puerto
ENV PORT=$PORT

# Expose el puerto dinámicamente
EXPOSE $PORT

# Serve the application usando el puerto de la variable de entorno
CMD ["sh", "-c", "serve -s dist -l $PORT"]