FROM node:20.12.0-alpine3.19

WORKDIR /app

# Copy the root package.json and lock files for dependency resolution
COPY package.json pnpm-lock.yaml ./

# Copy the app-specific package.json and lock files for dependency resolution
COPY apps/admin-app/package.json apps/admin-app/package-lock.json ./apps/admin-app/

COPY turbo.json ./
COPY tsconfig.json ./
COPY packages ./packages
COPY . .

# Install PNPM
RUN npm install -g pnpm

# Install Corepack and PNPM
RUN npm install -g corepack
RUN corepack prepare pnpm@8.9.0

# Install dependencies
RUN pnpm install

# Build only for admin-app
RUN pnpm run build --filter admin-app

EXPOSE 3000

CMD ["pnpm", "run", "start-admin-app"]