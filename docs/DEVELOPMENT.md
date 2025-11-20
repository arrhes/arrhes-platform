# Guide de développement

Ce document vous guidera pour installer, configurer et développer Arrhes sur votre machine locale.

## Table des matières

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

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

### Node.js et pnpm

- **Node.js** : Version 24.5 ou supérieure
  ```bash
  node --version  # Devrait afficher v24.5.x ou supérieur
  ```
  
  Installation : https://nodejs.org/

- **pnpm** : Version 9 ou supérieure
  ```bash
  pnpm --version
  ```
  
  Installation :
  ```bash
  npm install -g pnpm
  # ou
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  ```

### PostgreSQL

- **PostgreSQL** : Version 14 ou supérieure recommandée
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

### Services optionnels (pour développement complet)

- **Docker** (pour MinIO et MailHog) : https://www.docker.com/get-started
- Ou configurez des services S3 et SMTP alternatifs

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/arrhes/arrhes.git
cd arrhes
```

### 2. Installer les dépendances

```bash
pnpm install
```

Cette commande installera toutes les dépendances de tous les packages du monorepo.

### 3. Vérifier l'installation

```bash
pnpm ls --depth=0
```

Vous devriez voir tous les packages workspace listés.

## Configuration

### 1. Créer la base de données PostgreSQL

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Dans le shell PostgreSQL :
CREATE USER arrhes_user WITH PASSWORD 'arrhes_password';
CREATE DATABASE arrhes OWNER arrhes_user;
GRANT ALL PRIVILEGES ON DATABASE arrhes TO arrhes_user;
\q
```

### 2. Configurer les services externes (optionnel)

#### MinIO (Stockage de fichiers)

```bash
# Lancer MinIO avec Docker
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  -v ~/minio/data:/data \
  quay.io/minio/minio server /data --console-address ":9001"

# Accéder à la console : http://localhost:9001
# Créer un bucket nommé "arrhes-files"
```

#### MailHog (Test d'emails)

```bash
# Lancer MailHog avec Docker
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog

# Interface web : http://localhost:8025
```

### 3. Créer les fichiers de configuration

**`packages/api/.env` :**

```bash
cd packages/api
cat > .env << 'EOF'
# Environnement
ENV=development
VERBOSE=true
PORT=3000

# CORS et Cookies
CORS_ORIGIN=http://localhost:5173
COOKIES_DOMAIN=localhost
COOKIES_KEY=development-secret-key-change-in-production-min-32-chars

# URLs
API_BASE_URL=http://localhost:3000
PLATFORM_BASE_URL=http://localhost:5173
WEBSITE_BASE_URL=http://localhost:5174

# Base de données
SQL_DATABASE_URL=postgres://arrhes_user:arrhes_password@localhost:5432/arrhes

# Stockage MinIO
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_NAME=arrhes-files
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin

# Email MailHog
EMAIL_ENDPOINT=localhost:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
EOF
cd ../..
```

**`packages/tools/.env` :**

```bash
cd packages/tools
cat > .env << 'EOF'
DATABASE_URL=postgres://arrhes_user:arrhes_password@localhost:5432/arrhes
EOF
cd ../..
```

Pour plus de détails sur la configuration, consultez [CONFIGURATION.md](CONFIGURATION.md).

## Initialisation de la base de données

### 1. Pousser le schéma vers la base de données

```bash
pnpm --filter tools run push
```

Cette commande crée toutes les tables nécessaires dans PostgreSQL à partir des schémas définis dans `@arrhes/metadata`.

### 2. Seed avec des données de démonstration

```bash
pnpm --filter tools run seed
```

Cette commande insère :
- Un utilisateur de démonstration : `demo@arrhes.com` / `demo`
- Une organisation exemple : "Arrhes"
- Des comptes comptables de base
- Des journaux
- Des écritures comptables d'exemple pour 2022 et 2023
- Des documents et états financiers

### 3. Réinitialiser la base (si nécessaire)

Pour tout supprimer et recommencer :

```bash
pnpm --filter tools run reset
```

Cette commande exécute : `clear` + `push` + `seed`

## Lancement en développement

### Option 1 : Tout lancer ensemble (recommandé)

```bash
pnpm run dev
```

Cette commande lance simultanément :
- **API** sur http://localhost:3000
- **Platform** sur http://localhost:5173

Les deux processus tournent en parallèle avec hot-reload activé.

### Option 2 : Lancer individuellement

Dans des terminaux séparés :

**Terminal 1 - API :**
```bash
pnpm --filter api run dev
```

**Terminal 2 - Platform :**
```bash
pnpm --filter platform run dev
```

**Terminal 3 - Metadata (optionnel, watch mode) :**
```bash
pnpm --filter metadata run dev
```

### Accès à l'application

- **Frontend** : http://localhost:5173
- **API** : http://localhost:3000
- **MinIO Console** : http://localhost:9001 (si configuré)
- **MailHog** : http://localhost:8025 (si configuré)

### Identifiants de démonstration

```
Email    : demo@arrhes.com
Password : demo
```

## Structure du projet

```
arrhes/
├── packages/
│   ├── api/                    # Backend API
│   │   ├── src/
│   │   │   ├── api.ts         # Configuration Hono
│   │   │   ├── server.ts      # Point d'entrée
│   │   │   ├── clients/       # Clients services externes
│   │   │   ├── factories/     # Factories Hono typées
│   │   │   ├── middlewares/   # Auth, validation, etc.
│   │   │   ├── routes/        # Routes API
│   │   │   │   ├── auth/      # Routes authentifiées
│   │   │   │   └── public/    # Routes publiques
│   │   │   └── utilities/     # Utilitaires
│   │   ├── .env               # Variables d'environnement
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── platform/               # Frontend React
│   │   ├── src/
│   │   │   ├── root.tsx       # Point d'entrée React
│   │   │   ├── index.html     # HTML principal
│   │   │   ├── assets/        # CSS, fonts, images
│   │   │   ├── components/    # Composants UI réutilisables
│   │   │   ├── contexts/      # React contexts
│   │   │   ├── features/      # Features par domaine
│   │   │   ├── routes/        # Définition routes
│   │   │   └── utilities/     # Utilitaires
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   ├── metadata/               # Schémas et types partagés
│   │   ├── src/
│   │   │   ├── models/        # Modèles Drizzle ORM
│   │   │   ├── schemas/       # Schémas Valibot
│   │   │   ├── routes/        # Définitions routes API
│   │   │   ├── components/    # Composants métier
│   │   │   └── utilities/     # Utilitaires
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── tools/                  # Outils base de données
│   │   ├── src/
│   │   │   ├── clearDB.ts     # Vider la DB
│   │   │   ├── migrate.ts     # Migrations
│   │   │   ├── schemas.ts     # Import schémas
│   │   │   └── seed/          # Scripts de seed
│   │   ├── .env               # Variables d'environnement
│   │   ├── drizzle.config.ts  # Config Drizzle Kit
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── website/                # Site vitrine
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
│
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md
│   ├── CONFIGURATION.md
│   ├── DEVELOPMENT.md
│   └── CONTRIBUTING.md
│
├── pnpm-workspace.yaml         # Configuration workspace
├── package.json                # Scripts racine
├── tsconfig.json               # Config TypeScript globale
├── LICENSE
└── README.md
```

## Scripts disponibles

### Scripts racine (depuis `/`)

```bash
# Lancer API + Platform en développement
pnpm run dev

# Builder tous les packages
pnpm run build
```

### Scripts API (`packages/api/`)

```bash
# Développement avec hot-reload
pnpm --filter api run dev

# Build pour production
pnpm --filter api run build

# Lancer en production (après build)
pnpm --filter api run start
```

### Scripts Platform (`packages/platform/`)

```bash
# Développement avec hot-reload
pnpm --filter platform run dev

# Build pour production
pnpm --filter platform run build

# Linter
pnpm --filter platform run lint
```

### Scripts Metadata (`packages/metadata/`)

```bash
# Build avec watch mode
pnpm --filter metadata run dev

# Build une fois
pnpm --filter metadata run build
```

### Scripts Tools (`packages/tools/`)

```bash
# Générer les migrations depuis le schéma
pnpm --filter tools run generate

# Pousser le schéma vers la DB (dev)
pnpm --filter tools run push

# Appliquer les migrations (production)
pnpm --filter tools run migrate

# Seed avec données de démo
pnpm --filter tools run seed

# Vider complètement la DB
pnpm --filter tools run clear

# Reset complet : clear + push + seed
pnpm --filter tools run reset

# Supprimer les migrations
pnpm --filter tools run drop
```

## Workflow de développement

### Développement typique

1. **Lancer les services externes**
   ```bash
   # PostgreSQL (si pas démarré)
   sudo systemctl start postgresql
   
   # MinIO (si arrêté)
   docker start minio
   
   # MailHog (si arrêté)
   docker start [container-id]
   ```

2. **Lancer l'application**
   ```bash
   pnpm run dev
   ```

3. **Développer avec hot-reload**
   - Modifications dans `packages/api/src/` → Rechargement automatique de l'API
   - Modifications dans `packages/platform/src/` → HMR (Hot Module Replacement)
   - Modifications dans `packages/metadata/src/` → Nécessite rebuild (ou mode watch)

### Modifier le schéma de base de données

1. **Modifier les modèles** dans `packages/metadata/src/models/`

2. **Rebuild metadata**
   ```bash
   pnpm --filter metadata run build
   ```

3. **Générer la migration** (optionnel, pour production)
   ```bash
   pnpm --filter tools run generate
   ```

4. **Appliquer les changements**
   ```bash
   # Développement : push direct
   pnpm --filter tools run push
   
   # Production : migrations
   pnpm --filter tools run migrate
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
   import { myFeatureRoute } from '@arrhes/metadata/routes'
   import { authFactory } from '#/factories/authFactory.js'
   
   export const myFeature = authFactory.createApp().post(
       myFeatureRoute.path,
       async (c) => {
           // Implémentation
           return c.json({ /* ... */ })
       }
   )
   ```

3. **Enregistrer la route** dans `packages/api/src/routes/routes.ts`

4. **Utiliser côté frontend** dans `packages/platform/src/utilities/postAPI.ts`

### Ajouter une nouvelle page

1. **Créer le composant** dans `packages/platform/src/features/`

2. **Définir la route** dans `packages/platform/src/routes/root/`

3. **Mettre à jour le tree** dans `packages/platform/src/routes/platformTree.ts`

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
pnpm --filter api run dev:debug
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

### Platform (Frontend)

**Console du navigateur :**
- Ouvrir DevTools (F12)
- Voir les erreurs, warnings, et logs

**React DevTools :**
- Installer l'extension React DevTools
- Inspecter les composants et leur state

**TanStack Query DevTools :**
Déjà intégré dans l'application, visible en bas de l'écran en mode dev.

### Base de données

**Inspecter la DB :**
```bash
psql postgres://arrhes_user:arrhes_password@localhost:5432/arrhes
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

### Problèmes courants

**"Cannot connect to database" :**
- Vérifiez que PostgreSQL est démarré
- Testez la connexion : `psql <DATABASE_URL>`
- Vérifiez les credentials dans `.env`

**"Module not found @arrhes/metadata" :**
- Rebuild metadata : `pnpm --filter metadata run build`
- Ou lancez en mode watch : `pnpm --filter metadata run dev`

**"CORS error" :**
- Vérifiez `CORS_ORIGIN` dans `packages/api/.env`
- Assurez-vous que l'URL correspond exactement

**"Cookie not set" :**
- Vérifiez `COOKIES_DOMAIN` (doit être `localhost` en dev)
- Vérifiez que l'API et la platform sont sur le même domaine

**"S3/Storage error" :**
- Vérifiez que MinIO est démarré : `docker ps`
- Vérifiez que le bucket existe
- Testez l'endpoint : `curl http://localhost:9000`

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
- **Tailwind CSS** : https://tailwindcss.com/

---

Pour contribuer au projet, consultez [CONTRIBUTING.md](CONTRIBUTING.md).
