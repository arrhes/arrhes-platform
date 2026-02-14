#!/bin/bash
# ==============================================================================
# Build Metadata Package
# ==============================================================================
# Builds the metadata package which is required by API and tools
# ==============================================================================
set -e

echo "🔨 Building @arrhes/application-metadata..."
pnpm --filter="@arrhes/application-metadata" build
