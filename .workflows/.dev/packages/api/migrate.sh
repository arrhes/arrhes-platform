#!/bin/bash
# ==============================================================================
# Database Migration
# ==============================================================================
# Runs database migrations using Drizzle (push --force is idempotent)
# ==============================================================================
set -e

echo "🗄️ Running database migrations..."
cd /workspace/packages/tools
pnpm run push
echo "✓ Database migrations complete"
