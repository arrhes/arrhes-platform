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

# Fix permissions for bind-mounted workspace
# The workspace is bind-mounted from the host, so we need to ensure the node user can write to it
echo "🔧 Fixing workspace permissions..."
chown -R node:node /workspace

# Switch to node user for the rest of the script
echo "📦 Installing workspace dependencies..."
su node -c "CI=true pnpm install"

echo "🔨 Building @arrhes/application-metadata..."
su node -c "pnpm --filter='@arrhes/application-metadata' build"

echo "🗄️ Checking database..."
# Check if tables already exist
if PGPASSWORD=admin /usr/bin/psql -h postgres -U postgres -d default -c '\dt' 2>/dev/null | grep -q table_user; then
  echo "Database tables already exist, skipping migration"
else
  echo "Running database migrations..."
  # Use expect to handle interactive prompts - select first option (no truncate)
  su node -c "cd /workspace/packages/tools && expect -c '
    set timeout 60
    spawn pnpm run push
    expect {
      \"No, add the constraint without truncating the table\" {
        send \"\r\"
        exp_continue
      }
      \"No, abort\" {
        send \"\r\"
        exp_continue
      }
      eof
    }
  ' || true"
fi

echo "🌱 Seeding demo data..."
su node -c "cd /workspace/packages/tools && pnpm run seed || echo 'Seeding skipped (data may already exist)'"

echo "🚀 Starting API dev server..."
cd /workspace/packages/api
exec su node -c "pnpm --filter='@arrhes/application-api' dev"
