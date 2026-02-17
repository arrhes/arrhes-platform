# ==============================================================================
# Website Development Dockerfile
# ==============================================================================
# Self-contained development image for the website service.
# - Dependencies installed at build time (node_modules inside image)
# - Source code bind-mounted at runtime for live editing
# - No entrypoint script needed - just run `docker compose up`
#
# Layer caching strategy:
#   1. Package manifests (changes rarely)  → cached dependency install
#   2. Source code (changes often)         → only invalidates prepare step
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

# --- Layer 1: Install dependencies (cached unless manifests/lockfile change) ---
# Copy only package manifests and lockfile first for optimal caching.
# This layer is only invalidated when dependencies actually change.
COPY package.json pnpm-workspace.yaml ./
COPY packages/metadata/package.json ./packages/metadata/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/website/package.json ./packages/website/package.json

RUN pnpm install --ignore-scripts

# --- Layer 2: Build preparation (codegen, etc.) ---
# Copy source needed for prepare scripts (panda codegen).
# This layer is invalidated on source changes but dependency install is still cached.
COPY packages/metadata ./packages/metadata
COPY packages/ui ./packages/ui
COPY packages/website ./packages/website

RUN pnpm --filter="@arrhes/ui" run prepare

# Copy environment file for Vite
COPY .workflows/.dev/packages/website/.env ./packages/website/.env

# Set working directory to website package
WORKDIR /workspace/packages/website

# Run Vite dev server
# Source files will be bind-mounted at runtime, overriding the copied files
CMD ["pnpm", "dev", "--", "--host", "0.0.0.0"]
