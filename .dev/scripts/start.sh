#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE=".dev/compose.yml"
SERVICE="arrhes-platform"

echo "Remove previous containers"
docker ps -a --filter="name=arrhes-" -q | xargs -r docker rm -f

ensure_volume() {
  name="$1"
  if ! docker volume inspect "$name" >/dev/null 2>&1; then
    echo "Creating docker volume: $name"
    docker volume create --name "$name"
  else
    echo "Volume exists: $name"
  fi
}
ensure_volume arrhes_postgres_data
ensure_volume arrhes_rustfs_data

echo "Starting dev services (docker compose up -d)..."
docker compose --project-directory="." --file="$COMPOSE_FILE" up -d --build

echo "Services started:"
docker compose --project-directory="." --file="$COMPOSE_FILE" ps

echo "Bootstrapping workspace inside the dev container (install deps, build metadata, push/seed DB)..."
# Run the bootstrap as the node user to match container expectations
docker compose --project-directory="." --file="$COMPOSE_FILE" exec -u node $SERVICE bash -lc "bash .dev/scripts/initialize.sh"

echo "Bootstrap complete. To open a shell inside the dev container run:"
echo "  docker compose -f $COMPOSE_FILE exec $SERVICE bash"
