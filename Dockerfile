# Build stage
FROM oven/bun:latest as build

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:latest

WORKDIR /app

# Install a simple http server to serve static content
RUN bun install --global serve

# Copy build artifacts from build stage
COPY --from=build /app/dist /app/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4435

# Expose the port
EXPOSE 4435

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "4435"]