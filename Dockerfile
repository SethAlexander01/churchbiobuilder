# Stage 1: Build client and server
FROM node:18 AS builder

WORKDIR /app

# Copy the entire project
COPY . .

# Install dependencies for all workspaces
RUN npm install

# Build both client and server
RUN npm run build --workspace=client && npm run build --workspace=server


# Stage 2: Run the server
FROM node:18

WORKDIR /app

# Copy only built output from builder
COPY --from=builder /app .

# Install only production dependencies
RUN npm install --omit=dev

# Start the server
CMD ["npm", "run", "start", "--workspace", "server"]
