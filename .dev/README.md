# Dev Container Configuration

Ce répertoire contient la configuration pour développer Arrhes dans un environnement de developpement (docker container).

## Aperçu

Le projet utilise désormais un fichier Compose canonique situé dans `.dev/compose.yml` et un script d'orchestration simple `.dev/scripts/start.sh` à la racine du dépôt pour démarrer et initialiser l'environnement de développement.

- Le script `.dev/scripts/start.sh` : démarre les services Docker (Postgres, RustFS, Mailpit, devcontainer) puis exécute le script de bootstrap à l'intérieur du conteneur de développement.
- Le bootstrap (`.dev/scripts/initialize.sh`) installe les dépendances, construit `@arrhes/metadata`, crée les fichiers `.env`, initialise la base de données et injecte les données de démonstration.

## Fichiers importants

- `.dev/scripts/start.sh` — script d'aide pour démarrer les services et lancer le bootstrap (à la racine).
- `.dev/compose.yml` — compose canonique utilisé par les scripts.
- `.dev/Dockerfile` — image du devcontainer (Node + pnpm, utilisateur non-root).
- `.dev/scripts/initialize.sh` — script exécuté dans le conteneur après démarrage pour préparer l'environnement.

## Démarrage rapide (recommandé)

1. Depuis la racine du dépôt, lancer :

   ```bash
   .dev/scripts/start.sh
   ```

   - Cette commande exécute `docker compose -f .dev/compose.yml up -d` puis lance le bootstrap à l'intérieur du service `arrhes-application`.
   - Le bootstrap crée les fichiers `.env` nécessaires si absents, construit `@arrhes/metadata`, pousse la migration de la BDD et insère les données de démonstration.

2. Ouvrir un shell dans le conteneur (si nécessaire) :

   ```bash
   docker compose -f .dev/compose.yml exec arrhes-application bash
   ```


## Ports & services

- PostgreSQL : `localhost:5432` (container `postgres`)
- RustFS API : `http://localhost:9000` (service `rustfs`)
- RustFS Console (web) : `http://localhost:9001`
- Mailpit SMTP : `1025` (SMTP)
- Mailpit UI (web) : `http://localhost:8025`
- API : `http://localhost:3000`
- Platform : `http://localhost:5173`
- Website : `http://localhost:5174`

> Dans le conteneur, les services sont accessibles par leur nom Docker (`postgres`, `rustfs`, `mailpit`) ; depuis l'hôte, utilisez `localhost` et les ports exposés ci‑dessus.

## Rebuild du container

Si vous modifiez le `Dockerfile` ou le compose, rebuild l'image :

```bash
# Reconstruire l'image devcontainer
docker compose -f .dev/compose.yml build --no-cache arrhes-application

# Redémarrer les services
docker compose -f .dev/compose.yml up -d
```


## Troubleshooting

- Voir les services en cours :

```bash
docker compose -f .dev/compose.yml ps
```

- Logs d'un service (ex : `postgres`) :

```bash
docker compose -f .dev/compose.yml logs postgres
```

- Forcer une remise à zéro (supprime les volumes) :

```bash
docker compose -f .dev/compose.yml down -v
```

- Si les dépendances ne s'installent pas correctement (dans le conteneur) :

```bash
rm -rf node_modules
pnpm install
```

## Performance

- Le dépôt utilise un bind mount (`.:/workspace`) pour que les modifications effectuées depuis l'IDE hôte soient visibles immédiatement dans le conteneur (HMR, tests, etc.).
- Si vous développez sur macOS/Windows et constatez des lenteurs, testez les options Docker (volumes `cached`) ou développez via WSL2 sous Windows.

## Ressources

- Docker Compose : https://docs.docker.com/compose/


