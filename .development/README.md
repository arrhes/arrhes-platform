# Development Environment

Docker-based development environment for the Arrhes platform.

## Architecture

```
.development/
+-- compose.yml              # Main Docker Compose configuration
+-- .dockerignore            # Build context exclusions
+-- .gitignore               # Git tracking rules
+-- packages/
    +-- api/
    |   +-- Dockerfile       # API service image
    |   +-- entrypoint.sh    # API startup orchestrator
    |   +-- install.sh       # Dependency installation
    |   +-- build.sh         # Metadata build
    |   +-- migrate.sh       # DB schema push
    |   +-- seed.sh          # Demo data seeding
    |   +-- start.sh         # Dev server start
    |   +-- .env             # API environment variables
    +-- dashboard/
    |   +-- Dockerfile       # Dashboard service image
    |   +-- .env             # Dashboard environment variables
    +-- tools/
        +-- .env             # Tools environment variables
```

## Key Concepts

### Source Code Binding
- **Source files** (packages/) are bind-mounted from host to container
- Changes made on **either host or container** are instantly synced
- Enables live editing with IDE on host and HMR in container

### Runtime Isolation
- **node_modules** stored in Docker volumes (not on host)
- **Build outputs** stored in Docker volumes
- Keeps host clean and ensures consistent dependencies

### Services

**Infrastructure:**
- PostgreSQL (port 5432) - Database
- RustFS (ports 9000, 9001) - S3-compatible storage
- Mailpit (ports 1025, 8025) - SMTP server with web UI

**Applications:**
- API (port 3000) - Hono backend
- Dashboard (port 5173) - React admin interface

## Usage

### Start all services
```bash
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  up -d --build
```

Or with [just](https://github.com/casey/just):
```bash
just dev-up
```

### View logs
```bash
# All services
docker compose -f .development/compose.yml logs -f

# Specific service
docker compose -f .development/compose.yml logs -f api
```

### Stop services
```bash
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  down
```

### Rebuild after changes
```bash
# Rebuild specific service
docker compose -f .development/compose.yml build api

# Rebuild and restart
docker compose -f .development/compose.yml up -d --build api
```

### Access running containers
```bash
docker compose -f .development/compose.yml exec api bash
```

## Environment Files

Each service has its own `.env` file in `.development/packages/{service}/.env`:

- **api/.env** - API configuration (database, storage, email)
- **dashboard/.env** - Dashboard configuration (API URL, Vite variables)
- **tools/.env** - Database tools configuration

These files are bind-mounted into containers at runtime.

## How It Works

1. **Build Phase:**
   - Dockerfiles create minimal base images with Node.js + PNPM
   - No source code or dependencies copied during build
   - Images are lightweight and reusable

2. **Runtime Phase:**
   - Source code bind-mounted from `../packages` to `/workspace/packages`
   - node_modules stored in named volumes (isolated per service)
   - API entrypoint script runs: install -> build metadata -> migrate -> seed -> start

3. **Development:**
   - Edit code on host with your IDE
   - Changes instantly reflected in container
   - Vite HMR updates browser automatically
   - No manual restarts needed

## Troubleshooting

### Port already in use
```bash
# Check what's using the port
lsof -i :3000

# Stop the conflicting service or change port in compose.yml
```

### Dependencies not updating
```bash
# Remove volume and rebuild
docker volume rm arrhes-application_api_node_modules
docker compose -f .development/compose.yml up -d --build api
```

### Database reset
```bash
# Remove database volume (WARNING: deletes all data)
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  down
docker volume rm arrhes-application_postgres_data
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  up -d --build
```

### Clean slate
```bash
# Remove all containers, volumes, and rebuild
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  down -v
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  up -d --build
```
