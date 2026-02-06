#!/bin/bash
# ==============================================================================
# Seed Demo Data
# ==============================================================================
# Seeds the database with demo data for development
# ==============================================================================
set -e

echo "🌱 Seeding demo data..."
cd /workspace/packages/tools
pnpm run seed || echo "Seeding skipped (data may already exist)"
echo "✓ Seeding complete"
