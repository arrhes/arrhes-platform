#!/bin/bash
# ==============================================================================
# Dashboard Service Entrypoint
# ==============================================================================
# Runs on container startup to:
# 1. Install workspace dependencies
# 2. Build metadata package (required by dashboard)
# 3. Start Vite dev server with HMR
# ==============================================================================
set -e

echo "📦 Installing workspace dependencies..."
CI=true pnpm install

echo "🔨 Building @arrhes/application-metadata..."
pnpm --filter="@arrhes/application-metadata" build

echo "🚀 Starting dashboard dev server..."
cd /workspace/packages/dashboard
exec pnpm --filter="@arrhes/application-dashboard" dev -- --host 0.0.0.0
