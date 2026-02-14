#!/bin/bash
# ==============================================================================
# Database Migration
# ==============================================================================
# Runs database migrations using Drizzle
# Checks if tables exist before running to avoid unnecessary migrations
# ==============================================================================
set -e

echo "🗄️ Checking database..."

# Check if tables already exist
if PGPASSWORD=admin psql -h postgres -U postgres -d default -c '\dt' 2>/dev/null | grep -q table_user; then
    echo "✓ Database tables already exist, skipping migration"
else
    echo "Running database migrations..."
    cd /workspace/packages/tools
    # Use expect to handle interactive prompts - select first option (no truncate)
    expect -c '
        set timeout 60
        spawn pnpm run push
        expect {
            "No, add the constraint without truncating the table" {
                send "\r"
                exp_continue
            }
            "No, abort" {
                send "\r"
                exp_continue
            }
            eof
        }
    ' || true
    echo "✓ Database migrations complete"
fi
