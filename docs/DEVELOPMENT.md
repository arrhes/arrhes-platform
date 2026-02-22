# Guide de développement

Ce document vous guidera pour installer, configurer et développer Arrhes sur votre machine locale.

## Table des matières

- [Choix de l'environnement](#choix-de-lenvironnement)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Initialisation de la base de données](#initialisation-de-la-base-de-données)
- [Lancement en développement](#lancement-en-développement)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Workflow de développement](#workflow-de-développement)
- [Debugging](#debugging)
- [Conseils](#conseils)

## Choix de l'environnement

Vous avez deux options pour développer Arrhes :

### Option 1 : Docker (recommandé)

**Avantages :**
- Configuration 100% automatique
- Seuls Docker et Docker Compose sont nécessaires sur la machine hôte
- Tous les services préconfigurés (PostgreSQL, RustFS, Mailpit)
- Base de données initialisée automatiquement avec données de démo
- Hot-reload sur le code source
- Zéro configuration manuelle

**Prérequis :**
- Docker et Docker Compose v2+

**Idéal pour :** Tout le monde, en particulier les nouveaux contributeurs

### Option 2 : Développement natif

**Avantages :**
- Contrôle total sur chaque service
- IDE avec IntelliSense complet (TypeScript, ESLint, Panda CSS)
- Performances optimales

**Prérequis :**
- Node.js 25+
- pnpm 10+
- PostgreSQL 16+
- Optionnellement Docker pour RustFS et Mailpit

**Idéal pour :** Développeurs expérimentés, personnalisation avancée

---

**Conseil :**
- **Première contribution ?** Choisissez l'**Option 1 (Docker)** pour démarrer sans rien installer
- **Développement quotidien avec IDE ?** Choisissez l'**Option 2 (Natif)** pour une expérience IDE complète, ou combinez les deux : Docker pour l'infrastructure + `pnpm install` sur l'hôte pour l'IntelliSense

## Prérequis

> **Windows :** Certains chemins du repository sont longs et peuvent dépasser la limite par défaut de Windows. Avant de cloner, exécutez la commande suivante depuis une invite de commandes **administrateur** :
> ```
> git config --system core.longpaths true
> ```

### Option 1 : Docker

- **Docker** et **Docker Compose** v2+ : https://www.docker.com/get-started
  ```bash
  docker --version
  docker compose version
  ```

C'est tout ! Node.js, pnpm, PostgreSQL, RustFS et Mailpit tournent dans les containers.

### Option 2 : Développement natif

- **Node.js** : Version 25 ou supérieure
  ```bash
  node --version  # Devrait afficher v25.x ou supérieur
  ```

  Installation : https://nodejs.org/

- **pnpm** : Version 10 ou supérieure
  ```bash
  pnpm --version
  ```

  Installation :
  ```bash
  npm install -g pnpm
  # ou
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  ```

- **Docker** et **Docker Compose** v2+ (pour l'infrastructure) : https://www.docker.com/get-started
  ```bash
  docker --version
  docker compose version
  ```

- **PostgreSQL** : Version 16 ou supérieure (si vous n'utilisez pas Docker pour l'infrastructure)
  ```bash
  psql --version
  ```

  **Installation :**

  **Ubuntu/Debian :**
  ```bash
  sudo apt update
  sudo apt install postgresql postgresql-contrib
  sudo systemctl start postgresql
  ```

  **macOS :**
  ```bash
  brew install postgresql@16
  brew services start postgresql@16
  ```

  **Windows :**
  Télécharger depuis https://www.postgresql.org/download/windows/

## Installation

### Option 1 : Docker (recommandé)

**Étape 1 : Cloner le repository**

```bash
git clone https://github.com/arrhes/arrhes-platform.git
cd arrhes-platform
```

**Étape 2 : Démarrer tous les services**

```bash
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  up -d --build
```

> **Optionnel :** Si vous installez [just](https://github.com/casey/just), vous pouvez utiliser `just dev-up` comme raccourci.

C'est tout ! Cette commande :
1. Construit les images Docker (API + Dashboard)
2. Démarre l'infrastructure (PostgreSQL, RustFS, Mailpit)
3. Installe les dépendances (`pnpm install`)
4. Build le package metadata
5. Applique le schéma de base de données (Drizzle push)
6. Insère les données de démonstration (seed)
7. Lance les serveurs de développement avec hot-reload

**URLs d'accès :**
- **Dashboard** : http://localhost:5173
- **API** : http://localhost:3000
- **RustFS Console** : http://localhost:9001 (`rustfsadmin` / `rustfsadmin`)
- **Mailpit** : http://localhost:8025

**Identifiants de démonstration :**
- Email : `demo@arrhes.com`
- Mot de passe : `demo`

> **Premier lancement :** Créez le bucket `arrhes-files` dans la console RustFS (http://localhost:9001).

**Commandes utiles :**

```bash
# Voir les logs
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  logs -f

# Arrêter les services
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  down

# Réinitialiser la base de données
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  exec api sh -c "cd /workspace/packages/tools && pnpm run reset"

# Accéder au container API
docker compose -f .development/compose.yml exec api bash
```

---

### Option 2 : Développement natif

**Étape 1 : Cloner le repository**

```bash
git clone https://github.com/arrhes/arrhes-platform.git
cd arrhes-platform
```

**Étape 2 : Installer les dépendances**

```bash
pnpm install
```

Cette commande installera toutes les dépendances de tous les packages du monorepo.

**Étape 3 : Construire le package metadata**

```bash
pnpm --filter @arrhes/application-metadata run build
```

Ce package est requis par les autres packages (API, Dashboard, Tools).

**Étape 4 : Vérifier l'installation**

```bash
pnpm ls --depth=0
```

Vous devriez voir tous les packages workspace listés.

## Configuration

### Option 1 : Docker

**Aucune configuration manuelle nécessaire !**

Les fichiers `.env` sont déjà configurés dans `.development/packages/` et montés automatiquement dans les containers. Voir [CONFIGURATION.md](CONFIGURATION.md) pour le détail des variables.

> **Note :** Dans les `.env` Docker, les noms d'hôte utilisent les noms de service Docker (`postgres`, `rustfs`, `mailpit`) au lieu de `localhost`. Les URLs accessibles depuis le navigateur utilisent `localhost`.

---

### Option 2 : Configuration native

#### 1. Lancer l'infrastructure avec Docker (recommandé)

```bash
# Lancer les services d'infrastructure uniquement
docker compose -f .development/compose.yml up -d postgres rustfs mailpit
```

Les services seront disponibles sur :
- **PostgreSQL** : `localhost:5432` (user: `postgres`, password: `admin`, db: `default`)
- **RustFS API** : `localhost:9000`
- **RustFS Console** : http://localhost:9001 (`rustfsadmin` / `rustfsadmin`)
- **Mailpit SMTP** : `localhost:1025`
- **Mailpit Web** : http://localhost:8025

#### 2. Créer le bucket RustFS

Accéder à http://localhost:9001, se connecter avec `rustfsadmin` / `rustfsadmin`, et créer un bucket nommé `arrhes-files`.

#### 3. Créer les fichiers de configuration

**`packages/api/.env` :**

```env
ENV=development
VERBOSE=true
PORT=3000

CORS_ORIGIN=http://localhost:5173
COOKIES_DOMAIN=localhost
COOKIES_KEY=development-secret-key-change-in-production-min-32-chars

API_BASE_URL=http://localhost:3000
PLATFORM_BASE_URL=http://localhost:5173
WEBSITE_BASE_URL=http://localhost:5174

SQL_DATABASE_URL=postgres://postgres:admin@localhost:5432/default

STORAGE_ENDPOINT=http://localhost:9000
STORAGE_BUCKET_NAME=arrhes-files
STORAGE_ACCESS_KEY=rustfsadmin
STORAGE_SECRET_KEY=rustfsadmin

EMAIL_ENDPOINT=localhost:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
```

**`packages/tools/.env` :**

```env
NODE_ENV=development
SQL_DATABASE_URL=postgres://postgres:admin@localhost:5432/default
```

#### Alternative : PostgreSQL natif (sans Docker)

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql    # Linux
psql -U postgres         # macOS/Windows

# Créer la base de données
CREATE DATABASE arrhes_dev;
\q
```

Adaptez `SQL_DATABASE_URL` dans les fichiers `.env` : `postgres://postgres:votre_mot_de_passe@localhost:5432/arrhes_dev`

#### Alternative : RustFS et Mailpit standalone

```bash
# RustFS (stockage S3-compatible)
docker run -d \
  -p 9000:9000 -p 9001:9001 \
  --name rustfs \
  -e "RUSTFS_CONSOLE_ENABLE=true" \
  -e "RUSTFS_ACCESS_KEY=rustfsadmin" \
  -e "RUSTFS_SECRET_KEY=rustfsadmin" \
  -e "RUSTFS_VOLUMES=/data" \
  -v rustfs_data:/data \
  rustfs/rustfs:latest

# Mailpit (SMTP de test)
docker run -d \
  -p 1025:1025 -p 8025:8025 \
  --name mailpit \
  axllent/mailpit:latest
```

---

**Pour plus de détails sur la configuration, consultez [CONFIGURATION.md](CONFIGURATION.md).**

## Initialisation de la base de données

### Option 1 : Docker

**Aucune action nécessaire !**

La base de données est automatiquement initialisée au démarrage du container API. L'entrypoint exécute :
1. `pnpm install` (installation des dépendances)
2. Build du package metadata
3. `drizzle-kit push` (création du schéma)
4. `pnpm run seed` (insertion des données de démo)

Si vous souhaitez reinitialiser la base :
```bash
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  exec api sh -c "cd /workspace/packages/tools && pnpm run reset"
```

---

### Option 2 : Configuration native

**Étape 1 : Pousser le schéma vers la base de données**

```bash
pnpm --filter @arrhes/application-tools run push
```

Cette commande crée toutes les tables nécessaires dans PostgreSQL à partir des schémas définis dans `@arrhes/application-metadata`.

**Étape 2 : Seed avec des données de démonstration**

```bash
pnpm --filter @arrhes/application-tools run seed
```

Cette commande insère :
- Un utilisateur de démonstration : `demo@arrhes.com` / `demo`
- Une organisation exemple : "Arrhes"
- Des comptes comptables de base
- Des journaux
- Des écritures comptables d'exemple pour 2022 et 2023
- Des documents et états financiers

**Étape 3 : Réinitialiser la base (si nécessaire)**

Pour tout supprimer et recommencer :

```bash
pnpm --filter @arrhes/application-tools run reset
```

Cette commande exécute : `clear` + `push` + `seed`

## Lancement en développement

### Option 1 : Docker

Si vous avez suivi la section Installation, les serveurs de développement sont déjà lancés avec hot-reload. Rien de plus à faire.

### Option 2 : Natif

```bash
pnpm run dev
```

Cette commande lance simultanément :
- **API** sur http://localhost:3000
- **Dashboard** sur http://localhost:5173

Les deux processus tournent en parallèle avec hot-reload activé.

### Lancer individuellement (optionnel)

Dans des terminaux séparés :

**Terminal 1 - API :**
```bash
pnpm --filter @arrhes/application-api run dev
```

**Terminal 2 - Dashboard :**
```bash
pnpm --filter @arrhes/application-dashboard run dev
```

**Terminal 3 - Metadata (optionnel, watch mode) :**
```bash
pnpm --filter @arrhes/application-metadata run dev
```

### Accès à l'application

- **Dashboard** : http://localhost:5173
- **API** : http://localhost:3000
- **RustFS Console** : http://localhost:9001 (`rustfsadmin` / `rustfsadmin`)
- **Mailpit Web UI** : http://localhost:8025

### Identifiants de démonstration

```
Email    : demo@arrhes.com
Password : demo
```

## Structure du projet

```
arrhes-platform/
+-- packages/
|   +-- api/                    # Backend API (@arrhes/application-api)
|   |   +-- src/
|   |   |   +-- api.ts         # Configuration Hono
|   |   |   +-- server.ts      # Point d'entrée
|   |   |   +-- clients/       # Clients services externes
|   |   |   +-- factories/     # Factories Hono typées
|   |   |   +-- middlewares/   # Auth, validation, etc.
|   |   |   +-- routes/        # Routes API
|   |   |   |   +-- auth/      # Routes authentifiées
|   |   |   |   +-- public/    # Routes publiques
|   |   |   +-- utilities/     # Utilitaires
|   |   +-- .env               # Variables d'environnement
|   |   +-- package.json
|   |   +-- tsconfig.json
|   |
|   +-- dashboard/              # Frontend React (@arrhes/application-dashboard)
|   |   +-- src/
|   |   |   +-- root.tsx       # Point d'entrée React
|   |   |   +-- index.html     # HTML principal
|   |   |   +-- assets/        # CSS, fonts, images
|   |   |   +-- components/    # Composants UI réutilisables
|   |   |   +-- contexts/      # React contexts
|   |   |   +-- features/      # Features par domaine
|   |   |   +-- routes/        # Définition routes
|   |   |   +-- utilities/     # Utilitaires
|   |   +-- package.json
|   |   +-- tsconfig.json
|   |   +-- vite.config.ts
|   |
|   +-- metadata/               # Schemas et types partages (@arrhes/application-metadata)
|   |   +-- src/
|   |   |   +-- models/        # Modèles Drizzle ORM
|   |   |   +-- schemas/       # Schémas Valibot
|   |   |   +-- routes/        # Définitions routes API
|   |   |   +-- components/    # Composants métier
|   |   |   +-- utilities/     # Utilitaires
|   |   +-- package.json
|   |   +-- tsconfig.json
|   |
|   +-- tools/                  # Outils base de données (@arrhes/application-tools)
|   |   +-- src/
|   |   |   +-- clearDB.ts     # Vider la DB
|   |   |   +-- migrate.ts     # Migrations
|   |   |   +-- schemas.ts     # Import schémas
|   |   |   +-- seed/          # Scripts de seed
|   |   +-- .env               # Variables d'environnement
|   |   +-- package.json
|   |   +-- tsconfig.json
|   |
|   +-- ui/                     # Composants UI partagés (@arrhes/ui)
|       +-- src/
|       +-- package.json
|       +-- panda.config.ts
|
+-- .development/               # Configuration Docker dev
|   +-- compose.yml
|   +-- packages/
|       +-- api/               # Dockerfile, entrypoint, .env
|       +-- dashboard/         # Dockerfile, .env
|       +-- tools/             # .env
+-- .production/                # Configuration Docker prod
+-- docs/                       # Documentation
|   +-- ARCHITECTURE.md
|   +-- CONFIGURATION.md
|   +-- DEVELOPMENT.md
|   +-- CONTRIBUTING.md
|   +-- MIGRATION.md
+-- AGENTS.md
+-- justfile                    # Commandes Docker raccourcies (optionnel)
+-- package.json
+-- pnpm-workspace.yaml
+-- LICENSE
+-- README.md
```

## Scripts disponibles

### Scripts racine (depuis `/`)

```bash
# Lancer API + Dashboard en développement
pnpm run dev

# Builder tous les packages
pnpm run build
```

### Scripts API (`packages/api/`)

```bash
# Développement avec hot-reload
pnpm --filter @arrhes/application-api run dev

# Build pour production
pnpm --filter @arrhes/application-api run build

# Lancer en production (après build)
pnpm --filter @arrhes/application-api run start
```

### Scripts Dashboard (`packages/dashboard/`)

```bash
# Développement avec hot-reload
pnpm --filter @arrhes/application-dashboard run dev

# Build pour production
pnpm --filter @arrhes/application-dashboard run build

# Linter
pnpm --filter @arrhes/application-dashboard run lint
```

### Scripts Metadata (`packages/metadata/`)

```bash
# Build avec watch mode
pnpm --filter @arrhes/application-metadata run dev

# Build une fois
pnpm --filter @arrhes/application-metadata run build
```

### Scripts Tools (`packages/tools/`)

```bash
# Générer les migrations depuis le schéma
pnpm --filter @arrhes/application-tools run generate

# Pousser le schéma vers la DB (dev)
pnpm --filter @arrhes/application-tools run push

# Appliquer les migrations (production)
pnpm --filter @arrhes/application-tools run migrate

# Seed avec données de démo
pnpm --filter @arrhes/application-tools run seed

# Vider complètement la DB
pnpm --filter @arrhes/application-tools run clear

# Reset complet : clear + push + seed
pnpm --filter @arrhes/application-tools run reset

# Supprimer les migrations
pnpm --filter @arrhes/application-tools run drop
```

## Workflow de développement

### Développement typique

#### Avec Docker

1. **Demarrer les services**
   ```bash
   docker compose --project-directory=".development" \
     --file=".development/compose.yml" \
     --project-name="arrhes-application" \
     up -d --build
   ```

2. **Développer avec hot-reload**
   - Modifications dans `packages/api/src/` : Rechargement automatique de l'API
   - Modifications dans `packages/dashboard/src/` : HMR (Hot Module Replacement)
   - Modifications dans `packages/metadata/src/` : Nécessite rebuild (ou mode watch)

3. **Arrêter les services (à la fin de la session)**
   ```bash
   docker compose --project-directory=".development" \
     --file=".development/compose.yml" \
     --project-name="arrhes-application" \
     down
   ```

#### Avec développement natif

1. **Lancer l'infrastructure**
   ```bash
   docker compose -f .development/compose.yml up -d postgres rustfs mailpit
   ```

2. **Lancer l'application**
   ```bash
   pnpm run dev
   ```

3. **Développer avec hot-reload**
   - Modifications dans `packages/api/src/` : Rechargement automatique de l'API
   - Modifications dans `packages/dashboard/src/` : HMR (Hot Module Replacement)
   - Modifications dans `packages/metadata/src/` : Nécessite rebuild (ou mode watch)

### Modifier le schéma de base de données

1. **Modifier les modèles** dans `packages/metadata/src/models/`

2. **Rebuild metadata**
   ```bash
   pnpm --filter @arrhes/application-metadata run build
   ```

3. **Générer la migration** (optionnel, pour production)
   ```bash
   pnpm --filter @arrhes/application-tools run generate
   ```

4. **Appliquer les changements**
   ```bash
   # Développement : push direct
   pnpm --filter @arrhes/application-tools run push

   # Production : migrations
   pnpm --filter @arrhes/application-tools run migrate
   ```

5. **Mettre à jour le seed** si nécessaire dans `packages/tools/src/seed/`

### Ajouter une nouvelle route API

1. **Créer la définition de route** dans `packages/metadata/src/routes/`
   ```typescript
   // packages/metadata/src/routes/auth/myFeature.ts
   import { routeDefinition } from '#src/utilities/routeDefinition.js'
   import * as v from 'valibot'

   export const myFeatureRoute = routeDefinition({
       path: '/api/auth/my-feature',
       paramsSchema: v.object({ /* ... */ }),
       bodySchema: v.object({ /* ... */ }),
       responseSchema: v.object({ /* ... */ }),
   })
   ```

2. **Créer l'implémentation** dans `packages/api/src/routes/auth/`
   ```typescript
   // packages/api/src/routes/auth/myFeature.ts
   import { myFeatureRoute } from '@arrhes/application-metadata/routes'
   import { authFactory } from '#/factories/authFactory.js'

   export const myFeature = authFactory.createApp().post(
       myFeatureRoute.path,
       async (c) => {
           // Implementation
           return c.json({ /* ... */ })
       }
   )
   ```

3. **Enregistrer la route** dans `packages/api/src/routes/routes.ts`

4. **Utiliser côté frontend** dans `packages/dashboard/src/utilities/postAPI.ts`

### Ajouter une nouvelle page

1. **Créer le composant** dans `packages/dashboard/src/features/`

2. **Définir la route** dans `packages/dashboard/src/routes/root/`

3. **Mettre à jour le tree** dans `packages/dashboard/src/routes/platformTree.ts`

4. **Ajouter la navigation** si nécessaire dans les layouts

## Debugging

### API (Backend)

**Logs verbeux :**
```env
VERBOSE=true
```

**Debugger Node.js :**

Modifier `packages/api/package.json` :
```json
{
  "scripts": {
    "dev:debug": "tsx watch --inspect --env-file=.env ./src/server.ts"
  }
}
```

Lancer :
```bash
pnpm --filter @arrhes/application-api run dev:debug
```

Attacher le debugger dans VS Code avec cette configuration (`.vscode/launch.json`) :
```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach to API",
  "port": 9229,
  "skipFiles": ["<node_internals>/**"]
}
```

### Dashboard (Frontend)

**Console du navigateur :**
- Ouvrir DevTools (F12)
- Voir les erreurs, warnings, et logs

**React DevTools :**
- Installer l'extension React DevTools
- Inspecter les composants et leur state

**TanStack Query DevTools :**
Déjà intégré dans l'application, visible en bas de l'écran en mode dev.

### Base de données

**Inspecter la DB (avec Docker) :**
```bash
docker compose -f .development/compose.yml exec postgres psql -U postgres -d default
```

**Inspecter la DB (natif) :**
```bash
psql postgres://postgres:admin@localhost:5432/default
```

**Commandes SQL utiles :**
```sql
-- Lister les tables
\dt

-- Voir le schéma d'une table
\d table_name

-- Compter les enregistrements
SELECT COUNT(*) FROM users;

-- Voir les derniers enregistrements
SELECT * FROM users ORDER BY "createdAt" DESC LIMIT 10;
```

**Drizzle Studio** (GUI pour visualiser la DB) :
```bash
pnpm dlx drizzle-kit studio --config=packages/tools/drizzle.config.ts
```

## Conseils

### Performance

- **Hot-reload lent ?** Redémarrez le serveur de développement
- **Build lent ?** Vérifiez que Node.js est à jour
- **pnpm lent ?** Nettoyez le cache : `pnpm store prune`

### Problemes courants

**"Cannot connect to database" :**
- **Avec Docker :** Vérifiez que les containers sont lancés :
  ```bash
  docker compose -f .development/compose.yml ps
  ```
- **Natif :** Vérifiez que PostgreSQL est démarré : `sudo systemctl status postgresql`
- Testez la connexion : `psql postgres://postgres:admin@localhost:5432/default`
- Vérifiez les credentials dans `.env`

**"Module not found @arrhes/application-metadata" :**
- Rebuild metadata : `pnpm --filter @arrhes/application-metadata run build`
- Ou lancez en mode watch : `pnpm --filter @arrhes/application-metadata run dev`

**"CORS error" :**
- Vérifiez `CORS_ORIGIN` dans `packages/api/.env`
- Assurez-vous que l'URL correspond exactement

**"Cookie not set" :**
- Vérifiez `COOKIES_DOMAIN` (doit être `localhost` en dev)
- Vérifiez que l'API et le dashboard sont sur le même domaine

**"S3/Storage error" :**
- Vérifiez que RustFS est démarré : `docker ps | grep rustfs`
- Vérifiez que le bucket existe (console : http://localhost:9001)
- Testez l'endpoint : `curl http://localhost:9000/health || curl http://localhost:9000/health/live`

**Problemes Docker :**
- **Port déjà utilisé :** Un autre service utilise le même port
  ```bash
  # Voir ce qui utilise le port 5432 (PostgreSQL)
  sudo lsof -i :5432
  # Ou arrêter l'autre service
  ```
- **Container ne démarre pas :** Voir les logs
  ```bash
  docker compose -f .development/compose.yml logs postgres
  docker compose -f .development/compose.yml logs rustfs
  docker compose -f .development/compose.yml logs mailpit
  ```
- **Réinitialiser complètement :**
  ```bash
  docker compose --project-directory=".development" \
    --file=".development/compose.yml" \
    --project-name="arrhes-application" \
    down -v
  docker compose --project-directory=".development" \
    --file=".development/compose.yml" \
    --project-name="arrhes-application" \
    up -d --build
  ```

### Bonnes pratiques

1. **Commits atomiques** : Un commit = une fonctionnalité/fix
2. **Messages de commit clairs** : Suivez les conventions (voir CONTRIBUTING.md)
3. **Tester avant de commit** : Vérifiez que tout fonctionne
4. **Suivre les patterns existants** : Regardez le code existant pour rester cohérent
5. **Documenter les changements** : Commentaires pour la logique complexe

### Ressources utiles

- **Hono** : https://hono.dev/
- **Drizzle ORM** : https://orm.drizzle.team/
- **Valibot** : https://valibot.dev/
- **TanStack Router** : https://tanstack.com/router/
- **TanStack Query** : https://tanstack.com/query/
- **Radix UI** : https://www.radix-ui.com/
- **Panda CSS** : https://panda-css.com/

---

Pour contribuer au projet, consultez [CONTRIBUTING.md](CONTRIBUTING.md).
