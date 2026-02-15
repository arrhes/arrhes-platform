# ==============================================================================
# CI Build Dockerfile
# ==============================================================================
# Mirrors the GitHub Actions CI pipeline locally:
#   1. Install dependencies
#   2. Biome check (lint + format)
#   3. Build all packages
#
# Usage: just build
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

# Copy everything needed for install + build
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml biome.json ./
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Run Biome check (lint + format)
RUN pnpm check

# Build all packages
RUN pnpm run build
