# Docker Deployment Guide

This guide explains how to build and run the INSWA application using Docker with multi-stage builds for production.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)

## Building the Docker Image

### Build the production image:
```bash
docker build -t inswa-app:latest .
```

### Build with specific tag:
```bash
docker build -t inswa-app:v1.0.0 .
```

## Running the Container

### Basic run:
```bash
docker run -p 3000:3000 inswa-app:latest
```

### Run with environment variables:
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=your_database_url \
  -e JWT_SECRET=your_jwt_secret \
  inswa-app:latest
```

### Run in detached mode:
```bash
docker run -d -p 3000:3000 --name inswa-container inswa-app:latest
```

## Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Run with Docker Compose:
```bash
docker-compose up -d
```

## Multi-Stage Build Explanation

The Dockerfile uses a 3-stage build process:

1. **Dependencies Stage**: Installs all dependencies using pnpm
2. **Builder Stage**: Builds the Next.js application for production
3. **Runner Stage**: Creates minimal production image with only necessary files

## Image Optimization Features

- **Alpine Linux**: Minimal base image for smaller size
- **Non-root user**: Enhanced security
- **Standalone output**: Optimized Next.js build
- **Health checks**: Container monitoring
- **Signal handling**: Proper process management with dumb-init

## Environment Variables

Common environment variables you might need:

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Monitoring and Logs

### View container logs:
```bash
docker logs inswa-container
```

### Follow logs in real-time:
```bash
docker logs -f inswa-container
```

### Check container health:
```bash
docker inspect --format='{{.State.Health.Status}}' inswa-container
```

## Troubleshooting

### Container won't start:
1. Check logs: `docker logs inswa-container`
2. Verify environment variables
3. Ensure port 3000 is not already in use

### Build fails:
1. Clear Docker cache: `docker system prune -a`
2. Check .dockerignore file
3. Verify all required files are present

### Performance issues:
1. Monitor resource usage: `docker stats inswa-container`
2. Consider increasing memory limits
3. Check database connection performance

## Production Deployment

For production deployment, consider:

1. Using a reverse proxy (nginx)
2. Setting up SSL/TLS certificates
3. Implementing proper logging
4. Setting up monitoring and alerting
5. Using container orchestration (Kubernetes, Docker Swarm)

## Security Best Practices

- Run containers as non-root user ✅
- Use minimal base images (Alpine) ✅
- Regularly update base images
- Scan images for vulnerabilities
- Use secrets management for sensitive data
- Implement proper network policies
