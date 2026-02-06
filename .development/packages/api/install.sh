#!/bin/bash
# ==============================================================================
# Install Dependencies
# ==============================================================================
# Installs all workspace dependencies using PNPM
# ==============================================================================
set -e

echo "📦 Installing workspace dependencies..."
pnpm install
