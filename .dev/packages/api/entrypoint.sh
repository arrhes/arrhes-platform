#!/bin/bash
set -e

echo "🚀 Entrypoint for arrhes-application-api"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
else
    echo "✅ Dependencies already installed"
fi

# Build packages (metadata must be built before tools)
echo "🔨 Building packages..."
pnpm --filter="@arrhes/application-metadata" run build

# Create .env files if they don't exist
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

API_ENV_SOURCE=".dev/packages/api/.env"
if [ ! -f "packages/api/.env" ]; then
    if [ -f "$API_ENV_SOURCE" ]; then
        echo "⚙️ Creating packages/api/.env from $API_ENV_SOURCE..."
        cp "$API_ENV_SOURCE" packages/api/.env
    else
        echo "❌ Missing $API_ENV_SOURCE. Please create it before running this script."
        exit 1
    fi
else
    echo "✅ packages/api/.env already exists"
fi

TOOLS_ENV_SOURCE=".dev/packages/tools/.env"
if [ ! -f "packages/tools/.env" ]; then
    if [ -f "$TOOLS_ENV_SOURCE" ]; then
        echo "⚙️ Creating packages/tools/.env from $TOOLS_ENV_SOURCE..."
        cp "$TOOLS_ENV_SOURCE" packages/tools/.env
    else
        echo "❌ Missing $TOOLS_ENV_SOURCE. Please create it before running this script."
        exit 1
    fi
else
    echo "✅ packages/tools/.env already exists"
fi

# Initialize database
echo "🗄️  Initializing database..."
pnpm --filter="@arrhes/application-tools" run push

# Seed demo data
echo "🌱 Seeding demo data..."
pnpm --filter="@arrhes/application-tools" run seed

# Starting
echo "🚀 Starting dev server..."
pnpm --filter="@arrhes/application-api" run dev

echo ""
echo "✨ Setup complete!"
echo ""
echo "Services available:"
echo "  - API : http://localhost:3000"
echo "  - Platform : http://localhost:5173"
echo "  - Rustfs Console : http://localhost:9001"
echo "  - Mailpit : http://localhost:8025"
echo ""
echo "Demo credentials:"
echo "  Email : demo@arrhes.com"
echo "  Password : demo"
echo ""
