set shell := ["bash", "-cu"]
COMPOSE_FILE := ".dev/compose.yml"
PROJECT := "arrhes-application"

up:
    export HOST_UID=$(id -u) HOST_GID=$(id -g) && \
    docker compose --project-directory="." --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" up -d --build

down:
    docker compose --project-directory="." --file="{{COMPOSE_FILE}}" --project-name="{{PROJECT}}" down
