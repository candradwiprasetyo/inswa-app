#FROM node:18-alpine AS builder
FROM node:20.20-alpine AS builder
# Set working directory
WORKDIR /app

# Enable Corepack for package manager version management
RUN corepack enable

# Copy package files first to leverage Docker cache
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies using the package manager specified in package.json
RUN npm install --force

# Copy all files (excluding what's in .dockerignore)
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
#FROM node:18-alpine AS runner
FROM node:20.20-alpine AS runner
# Set working directory
WORKDIR /app

# Install dependencies only needed for production
ENV NODE_ENV=production

# Enable Corepack
RUN corepack enable

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install production dependencies using the specified package manager
RUN npm install --production --force

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
