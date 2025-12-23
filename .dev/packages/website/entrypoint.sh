#!/bin/bash
# ==============================================================================
# Website Service Entrypoint
# ==============================================================================
# Runs on container startup to:
# 1. Install workspace dependencies
# 2. Start Vite dev server with HMR
# ==============================================================================
set -e

echo "📦 Installing workspace dependencies..."
CI=true pnpm install

echo "🚀 Starting website dev server..."
cd /workspace/packages/website
exec pnpm --filter="@arrhes/application-website" dev -- --host 0.0.0.0
