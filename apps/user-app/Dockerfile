FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./

COPY packages ./packages
COPY apps/user-app ./apps/user-app
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

# Build only for user-app
RUN pnpm run build --filter user-app

EXPOSE 3001

CMD ["pnpm", "run", "start-user-app"]