# syntax=docker.io/docker/dockerfile:1

FROM oven/bun:latest AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# First copy package.json and bun.lock for better caching
COPY package.json bun.lock* ./
# Then copy source.config.ts as it's needed for fumadocs-mdx
COPY source.config.ts ./
# Create minimum required directory structure
RUN mkdir -p content/docs
# Install dependencies
RUN bun install

# Build the app
FROM base AS builder
WORKDIR /app
# Copy all from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
# Copy the rest of the application
COPY . .
# Build the app
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000

CMD ["bun", "run", "start"]