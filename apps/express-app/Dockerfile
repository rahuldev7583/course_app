# Use node:20-alpine as the base image
FROM node:20-alpine AS base

# Install necessary packages
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

# Install Corepack, PNPM, and Turbo globally
RUN npm install -g corepack turbo esbuild
RUN corepack enable
RUN corepack prepare pnpm@8.9.0 --activate

# Set the global bin directory for pnpm
RUN pnpm config set store-dir ~/.pnpm-store

# Stage: Prune
FROM base AS pruned
WORKDIR /app

COPY . .
RUN turbo prune --scope=express-app --docker

# Stage: Builder
FROM base AS builder
WORKDIR /app

# Copy pruned files from the pruned stage
COPY --from=pruned /app/out/json/ ./
COPY --from=pruned /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruned /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Set build argument for DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Install dependencies for the isolated workspace
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --filter express-app...

# Copy full source files after dependencies are installed
COPY --from=pruned /app/out/full/ .

# Ensure Prisma is installed in the express-app workspace
RUN pnpm --filter express-app add prisma

# Check if schema file is copied
RUN ls /app/apps/express-app/prisma/schema.prisma || (echo "schema.prisma not found" && exit 1)

# Run Prisma generate and migrate commands in the express-app workspace
WORKDIR /app/apps/express-app
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npx prisma migrate deploy --schema=./prisma/schema.prisma

# Ensure esbuild is installed in the express-app workspace
RUN pnpm --filter express-app add esbuild

# Build the project using esbuild
RUN pnpm --filter express-app run build

# Stage: Production
FROM base AS production
WORKDIR /app

# Copy dependencies and built files from the builder stage
COPY --from=builder /app /app

# Prune dev dependencies in the express-app workspace
RUN pnpm install --prod --filter express-app

# Clean up source files to reduce image size
RUN rm -rf ./**/*/src

# Expose the port the application runs on
EXPOSE 5000

# Set environment variable for runtime
ENV DATABASE_URL=${DATABASE_URL}

# Command to run the Express app
CMD ["pnpm", "run", "start-express-app"]
