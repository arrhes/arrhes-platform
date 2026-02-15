# ==============================================================================
# API Service Dockerfile
# ==============================================================================
# Creates a Node.js container with PNPM for running the API service
# Source code is bind-mounted from host, dependencies installed at runtime
# ==============================================================================

ARG NODE_VERSION="25.2.1"
ARG PNPM_VERSION="10.26.1"

FROM node:${NODE_VERSION}-bullseye-slim

# Install PNPM package manager
RUN npm install -g "pnpm@${PNPM_VERSION}"

# Set working directory
WORKDIR /workspace

# Start via entrypoint script (bind-mounted at runtime)
# NOTE: We don't switch to node user here - entrypoint will handle permissions
ENTRYPOINT ["/bin/bash", "/workspace/.workflows/.dev/packages/api/entrypoint.sh"]
