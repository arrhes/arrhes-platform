set shell := ["bash", "-cu"]
COMPOSE_FILE := ".development/compose.yml"
PROJECT := "platform"

dev cmd:
    @just dev-{{cmd}}

dev-up:
    docker compose --project-directory=".development" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" up -d --build
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
    docker ps -a --filter="name=arrhes-" -q | xargs -r docker rm -f
    docker compose --project-directory=".development" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" down

dev-reset:
    @echo "Resetting database (clearing and reseeding)..."
    docker compose --project-directory=".development" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" exec api sh -c "cd /workspace/packages/tools && pnpm run reset"
    @echo "Database reset complete."

dev-logs:
    docker compose --project-directory=".development" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" logs -f
