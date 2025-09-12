# syntax=docker/dockerfile:1

############################
# 1) Dependencies
############################
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Use lockfile if present; otherwise fall back to npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

############################
# 2) Build (Vite)
############################
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

############################
# 3) Runtime (no Nginx)
#    Serve static dist/ with a tiny SPA-friendly server
############################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install a tiny static server with SPA fallback support
RUN npm i -g sirv-cli@2

# Copy only the built artifacts
COPY --from=build /app/dist ./dist

# (Optional hardening) Run as non-root
USER node

EXPOSE 3000
CMD ["sirv", "dist", "--single", "--host", "0.0.0.0", "--port", "3000"]
