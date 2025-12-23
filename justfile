set shell := ["bash", "-cu"]
COMPOSE_FILE := ".development/compose.yml"
PROJECT := "arrhes-application"

dev cmd:
    @just dev-{{cmd}}

dev-up:
    docker compose --project-directory=".development" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" up -d --build

dev-down:
    docker ps -a --filter="name=arrhes-" -q | xargs -r docker rm -f
    docker compose --project-directory=".development" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" down
