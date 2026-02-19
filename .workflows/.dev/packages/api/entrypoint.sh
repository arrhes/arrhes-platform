#!/bin/bash
# ==============================================================================
# API Service Entrypoint
# ==============================================================================
# Runs on container startup to initialize and start the API service
# Calls individual scripts for each task
# ==============================================================================
set -e

SCRIPT_DIR="/workspace/.workflows/.dev/packages/api"

# Fix permissions for bind-mounted workspace (ignore read-only mounts)
echo "🔧 Fixing workspace permissions..."
chown -R node:node /workspace 2>/dev/null || true

# Run all setup tasks as node user
su node -c "$SCRIPT_DIR/install.sh"
su node -c "$SCRIPT_DIR/migrate.sh"
su node -c "$SCRIPT_DIR/seed.sh"

# Start the API server (exec replaces shell process)
exec su node -c "$SCRIPT_DIR/start.sh"
