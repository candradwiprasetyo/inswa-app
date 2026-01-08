FROM node:18-alpine AS builder

# Tambah user non-root
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Set working directory dan ubah owner-nya
WORKDIR /app
RUN chown nodejs:nodejs /app

# Enable Corepack
RUN corepack enable

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Ganti user jadi non-root
#USER nodejs

# Install dependencies
RUN npm install --force

# Copy all files
COPY --chown=nodejs:nodejs . .

# Build the application
RUN npm run build


# ========================
# Production Stage
# ========================
FROM node:18-alpine AS runner

# Tambah user non-root
#RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

WORKDIR /app
#RUN chown nodejs:nodejs /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install production deps
#USER nodejs
RUN npm install --production --force

# Copy built files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
