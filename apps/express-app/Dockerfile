FROM node:20.12.0-alpine3.19

WORKDIR /app

# Copy the root package.json and lock files for dependency resolution
COPY package.json pnpm-lock.yaml ./

# Copy the app-specific package.json and lock files for dependency resolution
COPY apps/express-app/package.json apps/express-app/package-lock.json ./apps/express-app/

COPY packages ./packages
COPY turbo.json ./
COPY tsconfig.json ./
COPY . .

# Install PNPM
RUN npm install -g pnpm

# Install Corepack and PNPM
RUN npm install -g corepack
RUN corepack prepare pnpm@8.9.0

# Install dependencies
RUN pnpm install

#prisam generate
RUN pnpm run prisma:generate

# Build only for express-app
RUN pnpm run build --filter express-app

EXPOSE 5000

CMD ["pnpm", "run", "start-express-app"]