#!/bin/bash
# ==============================================================================
# API Service Entrypoint
# ==============================================================================
# Runs on container startup to:
# 1. Install workspace dependencies
# 2. Build metadata package (required by API and tools)
# 3. Run database migrations
# 4. Seed demo data
# 5. Start API dev server
# ==============================================================================
set -e

echo "📦 Installing workspace dependencies..."
CI=true pnpm install

echo "🔨 Building @arrhes/application-metadata..."
pnpm --filter="@arrhes/application-metadata" build

echo "🗄️ Running database migrations..."
cd /workspace/packages/tools
pnpm run push

echo "🌱 Seeding demo data..."
pnpm run seed

echo "🚀 Starting API dev server..."
cd /workspace/packages/api
exec pnpm --filter="@arrhes/application-api" dev
