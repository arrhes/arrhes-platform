#!/bin/bash
# ==============================================================================
# Website Service Entrypoint
# ==============================================================================
# Runs on container startup to:
# 1. Install workspace dependencies
# 2. Start Vite dev server with HMR
# ==============================================================================
set -e

# Fix permissions for bind-mounted workspace
echo "🔧 Fixing workspace permissions..."
chown -R node:node /workspace

echo "📦 Installing workspace dependencies..."
su node -c "CI=true pnpm install"

echo "🚀 Starting website dev server..."
cd /workspace/packages/website
exec su node -c "pnpm --filter='@arrhes/application-website' dev -- --host 0.0.0.0"
