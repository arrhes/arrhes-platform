set shell := ["bash", "-cu"]
COMPOSE_FILE := ".dev/compose.yml"
PROJECT := "arrhes-application"

up:
    docker compose --project-directory=".dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" up -d --build

down:
    docker ps -a --filter="name=arrhes-" -q | xargs -r docker rm -f
    docker compose --project-directory=".dev" --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" down
