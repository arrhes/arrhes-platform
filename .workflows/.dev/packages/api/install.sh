#!/bin/bash
# ==============================================================================
# Install Dependencies
# ==============================================================================
# Installs all workspace dependencies using PNPM
# The host lockfile is bind-mounted read-only to a staging path to avoid EBUSY
# errors. We copy it into the workspace before installing.
# ==============================================================================
set -e

echo "📦 Installing workspace dependencies..."

# Copy the host lockfile so pnpm resolves the correct dependency versions
cp /workspace/.pnpm-lock-host.yaml /workspace/pnpm-lock.yaml

pnpm install --no-frozen-lockfile
