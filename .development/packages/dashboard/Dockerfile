# ==============================================================================
# Dashboard Development Dockerfile
# ==============================================================================
# Self-contained development image for the dashboard service.
# - Dependencies installed at build time (node_modules inside image)
# - Source code bind-mounted at runtime for live editing
# - No entrypoint script needed - just run `docker compose up`
# ==============================================================================

ARG NODE_VERSION="25.2.1"
ARG PNPM_VERSION="10.26.1"

FROM node:${NODE_VERSION}-bullseye-slim

ARG PNPM_VERSION

# Install PNPM
RUN npm install -g "pnpm@${PNPM_VERSION}" && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Copy package manifests for dependency installation
COPY package.json pnpm-workspace.yaml ./

COPY packages/metadata ./packages/metadata
COPY packages/ui ./packages/ui
COPY packages/dashboard ./packages/dashboard

# Install all dependencies (hoisted to workspace root)
RUN pnpm install


# Copy metadata source and build it (dashboard depends on it)
RUN pnpm --filter="@arrhes/application-metadata" build

RUN pnpm --filter="@arrhes/dashboard" run prepare

# RUN pnpm --filter="@arrhes/ui" build

# Copy environment file for Vite
COPY .development/packages/dashboard/.env ./packages/dashboard/.env

# Set working directory to dashboard package
WORKDIR /workspace/packages/dashboard

# Run Vite dev server
# Source files will be bind-mounted at runtime, overriding the copied files
CMD ["pnpm", "dev", "--", "--host", "0.0.0.0"]
