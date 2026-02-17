set shell := ["bash", "-cu"]
COMPOSE_FILE := ".workflows/.dev/compose.yml"
PROJECT := "application"

dev cmd:
    @just dev-{{cmd}}

dev-up:
    @# Stop and remove any existing arrhes-related containers
    -docker ps -a --filter="name=application-" --filter="name=arrhes-" -q | xargs -r docker rm -f 2>/dev/null
    -docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" down --remove-orphans 2>/dev/null
    @# Kill any containers using our required ports
    -docker ps -q --filter="publish=5432" --filter="publish=1025" --filter="publish=8025" --filter="publish=9000" --filter="publish=9001" --filter="publish=3000" --filter="publish=5173" | xargs -r docker rm -f 2>/dev/null
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" up -d --build
    @echo ""
    @echo "=============================================="
    @echo "  Arrhes Development Environment Started"
    @echo "=============================================="
    @echo ""
    @echo "  Services:"
    @echo "    Dashboard:  http://localhost:5173"
    @echo "    API:        http://localhost:3000"
    @echo ""
    @echo "  Infrastructure:"
    @echo "    PostgreSQL: localhost:5432"
    @echo "    Mailpit:    http://localhost:8025"
    @echo "    RustFS:     http://localhost:9001"
    @echo ""
    @echo "  Demo Credentials:"
    @echo "    Email:      demo@arrhes.com"
    @echo "    Password:   demo"
    @echo ""
    @echo "  Logs: docker compose -f {{COMPOSE_FILE}} logs -f"
    @echo "=============================================="

dev-down:
    -docker ps -a --filter="name={{PROJECT}}-" --filter="name=arrhes-" -q | xargs -r docker rm -f 2>/dev/null
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" down --remove-orphans

dev-reset:
    @echo "Resetting database (clearing and reseeding)..."
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" exec api sh -c "cd /workspace/packages/tools && pnpm run reset"
    @echo "Database reset complete."

dev-logs:
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" logs -f

# ==============================================================================
# Build Pipeline
# ==============================================================================
# Mirrors the GitHub Actions CI workflow locally inside Docker:
#   1. pnpm install
#   2. pnpm check (Biome lint + format)
#   3. pnpm test:unit (Unit tests)
#   4. pnpm build (TypeScript + Vite)
#
# Usage: just build

build:
    @echo "=============================================="
    @echo "  Arrhes Build (lint + test + build)"
    @echo "=============================================="
    @echo ""
    docker build \
        --file .workflows/.build/packages/ci/Dockerfile \
        --build-arg NODE_VERSION=25.2.1 \
        --build-arg PNPM_VERSION=10.26.1 \
        --progress=plain \
        --no-cache \
        .
    @echo ""
    @echo "=============================================="
    @echo "  Build succeeded"
    @echo "=============================================="

# ==============================================================================
# Tests (requires dev environment running)
# ==============================================================================

# Run all unit tests
test-unit:
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" exec api sh -c "pnpm --recursive --if-present --filter='./packages/**' run test:unit"

# Run all integration tests
test-integration:
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" exec api sh -c "pnpm --filter='@arrhes/application-api' run test:integration"

# Run all Playwright E2E tests
test-e2e:
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" exec api sh -c "pnpm run test:e2e"

# Run all tests: unit + integration + E2E
test:
    docker compose --project-directory=".workflows/.dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" exec api sh -c "pnpm --recursive --if-present --filter='./packages/**' run test && pnpm run test:e2e"
