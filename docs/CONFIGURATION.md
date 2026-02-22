# Configuration

Ce document décrit toutes les variables d'environnement et les configurations nécessaires pour faire fonctionner Arrhes en développement local.

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Variables d'environnement - API](#variables-denvironnement---api)
- [Variables d'environnement - Tools](#variables-denvironnement---tools)
- [Variables d'environnement - Dashboard](#variables-denvironnement---dashboard)
- [Configuration PostgreSQL](#configuration-postgresql)
- [Configuration S3 (Stockage)](#configuration-s3-stockage)
- [Configuration SMTP (Email)](#configuration-smtp-email)
- [Exemples de configuration](#exemples-de-configuration)
- [Sécurité](#sécurité)

## Vue d'ensemble

Arrhes nécessite des fichiers de configuration `.env` pour chaque package :

1. **`packages/api/.env`** : Configuration du backend API
2. **`packages/tools/.env`** : Configuration des outils de base de données
3. **`packages/dashboard/.env`** : Configuration du dashboard frontend

Ces fichiers ne sont **pas versionnés** (`.gitignore`) pour des raisons de sécurité.

### Approches de configuration

**Option 1 : Avec Docker (recommandé)**

Le fichier `.development/compose.yml` lance automatiquement PostgreSQL, RustFS et Mailpit avec des valeurs par défaut prêtes à l'emploi. Les fichiers `.env` sont déjà configurés dans `.development/packages/` et montés automatiquement dans les containers. **Aucune configuration manuelle nécessaire.**

**Option 2 : Installation native**

Vous installez et configurez manuellement chaque service sur votre machine.

Ce document couvre les deux approches.

## Variables d'environnement - API

Fichier : `packages/api/.env`

### Environnement général

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `ENV` | `"development"` \| `"production"` | Environnement d'exécution | `development` |
| `VERBOSE` | `"true"` \| `"false"` | Mode verbeux (logs détaillés) | `true` |
| `PORT` | `string` | Port d'écoute du serveur | `3000` |

### CORS et Cookies

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `CORS_ORIGIN` | `string` | Origines autorisées (séparées par virgule) | `http://localhost:5173` |
| `COOKIES_DOMAIN` | `string` | Domaine des cookies | `localhost` |
| `COOKIES_KEY` | `string` | Clé secrète pour signer les cookies (min 32 chars) | `your-super-secret-key-min-32-characters-long` |

### URLs des services

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `API_BASE_URL` | `string` | URL de base de l'API | `http://localhost:3000` |
| `PLATFORM_BASE_URL` | `string` | URL du dashboard frontend | `http://localhost:5173` |
| `WEBSITE_BASE_URL` | `string` | URL du site vitrine | `http://localhost:5174` |

### Base de données

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `SQL_DATABASE_URL` | `string` | URL de connexion PostgreSQL | `postgres://postgres:admin@localhost:5432/default` |

### Stockage S3

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `STORAGE_ENDPOINT` | `string` | Endpoint S3 (ou compatible) | `http://localhost:9000` (RustFS) |
| `STORAGE_BUCKET_NAME` | `string` | Nom du bucket S3 | `arrhes-files` |
| `STORAGE_ACCESS_KEY` | `string` | Clé d'accès S3 | `rustfsadmin` |
| `STORAGE_SECRET_KEY` | `string` | Clé secrète S3 | `rustfsadmin` |

### Email SMTP

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `EMAIL_ENDPOINT` | `string` | Serveur SMTP | `smtp.gmail.com` |
| `EMAIL_USER` | `string` | Utilisateur SMTP | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | `string` | Mot de passe ou app password SMTP | `your-app-password` |

## Variables d'environnement - Tools

Fichier : `packages/tools/.env`

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `NODE_ENV` | `string` | Mode d'environnement | `development` |
| `SQL_DATABASE_URL` | `string` | URL de connexion PostgreSQL | `postgres://postgres:admin@localhost:5432/default` |

**Note :** `SQL_DATABASE_URL` doit être identique à celle de l'API.

## Variables d'environnement - Dashboard

Fichier : `packages/dashboard/.env`

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `VITE_ENV` | `string` | Environnement | `development` |
| `VITE_API_BASE_URL` | `string` | URL de l'API | `http://localhost:3000` |
| `VITE_DASHBOARD_BASE_URL` | `string` | URL du dashboard | `http://localhost:5173` |
| `VITE_WEBSITE_BASE_URL` | `string` | URL du site vitrine | `http://localhost:5174` |

## Configuration PostgreSQL

### Option 1 : Avec Docker (recommandé)

Aucune installation manuelle requise ! Le fichier `.development/compose.yml` configure automatiquement PostgreSQL.

**Lancer PostgreSQL :**
```bash
docker compose -f .development/compose.yml up -d postgres
```

**Configuration par défaut :**
- **Host** : `localhost`
- **Port** : `5432`
- **Database** : `default`
- **User** : `postgres`
- **Password** : `admin`
- **URL** : `postgres://postgres:admin@localhost:5432/default`

**Vérification de la connexion :**
```bash
psql postgres://postgres:admin@localhost:5432/default
```

**Commandes utiles :**
```bash
# Voir les logs
docker compose -f .development/compose.yml logs postgres

# Redémarrer
docker compose -f .development/compose.yml restart postgres

# Arrêter
docker compose -f .development/compose.yml stop postgres
```

### Option 2 : Installation native

**Ubuntu/Debian :**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS (Homebrew) :**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Windows :**
Télécharger l'installeur depuis [postgresql.org](https://www.postgresql.org/download/windows/)

**Création de la base de données :**
```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données
CREATE DATABASE arrhes_dev;
\q
```

**URL de connexion :**

Format : `postgres://[user]:[password]@[host]:[port]/[database]`

Exemple : `postgres://postgres:your-secure-password@localhost:5432/arrhes_dev`

**Vérification de la connexion :**
```bash
psql postgres://postgres:your-secure-password@localhost:5432/arrhes_dev
```

## Configuration S3 (Stockage)

Le système de stockage utilise l'API AWS S3 mais fonctionne avec n'importe quel service compatible S3.

### Option 1 : Avec Docker (recommandé)

Le fichier `.development/compose.yml` lance automatiquement RustFS.

**Lancer RustFS :**
```bash
docker compose -f .development/compose.yml up -d rustfs
```

**Configuration par défaut :**
- **Endpoint** : `http://localhost:9000`
- **Web UI** : http://localhost:9001
- **Access Key** : `rustfsadmin`
- **Secret Key** : `rustfsadmin`
- **Bucket** : `arrhes-files` (à créer)

**Variables d'environnement :**
```env
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_BUCKET_NAME=arrhes-files
STORAGE_ACCESS_KEY=rustfsadmin
STORAGE_SECRET_KEY=rustfsadmin
```

**Création du bucket :**

Via l'interface web :
1. Accéder à http://localhost:9001
2. Se connecter avec `rustfsadmin` / `rustfsadmin`
3. Cliquer sur "Buckets" > "Create Bucket"
4. Nommer le bucket `arrhes-files`

**Commandes utiles :**
```bash
# Voir les logs
docker compose -f .development/compose.yml logs rustfs

# Redémarrer
docker compose -f .development/compose.yml restart rustfs
```

### Option 2 : RustFS standalone (sans Docker Compose)

**Installation avec Docker :**
```bash
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name rustfs \
  -e "RUSTFS_CONSOLE_ENABLE=true" \
  -e "RUSTFS_ACCESS_KEY=rustfsadmin" \
  -e "RUSTFS_SECRET_KEY=rustfsadmin" \
  -e "RUSTFS_VOLUMES=/data" \
  -v rustfs_data:/data \
  rustfs/rustfs:latest
```

Suivez ensuite les mêmes étapes de création de bucket que ci-dessus.

### Option 3 : AWS S3 (Production)

**Configuration :**
```env
STORAGE_ENDPOINT=https://s3.eu-west-3.amazonaws.com
STORAGE_BUCKET_NAME=your-bucket-name
STORAGE_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
STORAGE_SECRET_KEY=YOUR_AWS_SECRET_KEY
```

**Prérequis :**
- Créer un bucket S3 dans votre région
- Créer un utilisateur IAM avec les permissions S3 appropriées
- Générer des clés d'accès pour cet utilisateur

### Option 4 : Autre service compatible S3

Cloudflare R2, DigitalOcean Spaces, Scaleway Object Storage, etc. sont également compatibles.

## Configuration SMTP (Email)

L'application envoie des emails pour :
- Magic links d'authentification
- Notifications importantes
- Invitations d'utilisateurs

### Option 1 : Avec Docker (recommandé pour le développement)

Le fichier `.development/compose.yml` lance automatiquement Mailpit, un serveur SMTP de test.

**Lancer Mailpit :**
```bash
docker compose -f .development/compose.yml up -d mailpit
```

**Configuration par défaut :**
- **SMTP** : `localhost:1025`
- **Interface web** : http://localhost:8025

**Variables d'environnement :**
```env
EMAIL_ENDPOINT=localhost:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
```

**Interface web :**
Accédez à http://localhost:8025 pour voir tous les emails envoyés par l'application.

**Avantages :**
- Aucun email réel n'est envoyé
- Visualisation de tous les emails
- Idéal pour le développement et les tests

**Commandes utiles :**
```bash
# Voir les logs
docker compose -f .development/compose.yml logs mailpit

# Redémarrer
docker compose -f .development/compose.yml restart mailpit
```

### Option 2 : Mailpit standalone (sans Docker Compose)

```bash
docker run -d -p 1025:1025 -p 8025:8025 --name mailpit axllent/mailpit:latest
```

Utilisez la même configuration que ci-dessus.

### Option 3 : Gmail (Test avec vrais emails)

**Configuration :**
```env
EMAIL_ENDPOINT=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

**Étapes :**
1. Activer l'authentification à deux facteurs sur votre compte Google
2. Générer un "mot de passe d'application" : https://myaccount.google.com/apppasswords
3. Utiliser ce mot de passe dans `EMAIL_PASSWORD`

### Option 4 : Services SMTP dédiés (Production)

**Brevo (ex-Sendinblue) :**
```env
EMAIL_ENDPOINT=smtp-relay.brevo.com
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-smtp-key
```

**SendGrid :**
```env
EMAIL_ENDPOINT=smtp.sendgrid.net
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

**Mailgun :**
```env
EMAIL_ENDPOINT=smtp.mailgun.org
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASSWORD=your-smtp-password
```

## Exemples de configuration

### Configuration avec Docker (recommandé)

Cette configuration utilise tous les services lancés par `.development/compose.yml`. Les fichiers `.env` sont déjà configurés dans `.development/packages/` et montés automatiquement.

**Démarrer tous les services :**
```bash
docker compose --project-directory=".development" \
  --file=".development/compose.yml" \
  --project-name="arrhes-application" \
  up -d --build
```

**Fichiers `.env` pré-configurés :**

`.development/packages/api/.env` :
```env
ENV="development"
VERBOSE="true"
PORT="3000"

CORS_ORIGIN="http://localhost:5173"
COOKIES_DOMAIN="localhost"
COOKIES_KEY="development-secret-key-change-in-production-min-32-chars"

API_BASE_URL="http://localhost:3000"
PLATFORM_BASE_URL="http://localhost:5173"
WEBSITE_BASE_URL="http://localhost:5174"

SQL_DATABASE_URL="postgres://postgres:admin@postgres:5432/default"

STORAGE_ENDPOINT="http://rustfs:9000"
STORAGE_BUCKET_NAME="arrhes-files"
STORAGE_ACCESS_KEY="rustfsadmin"
STORAGE_SECRET_KEY="rustfsadmin"

EMAIL_ENDPOINT="mailpit:1025"
EMAIL_USER="test"
EMAIL_PASSWORD="test"
```

`.development/packages/dashboard/.env` :
```env
VITE_ENV="development"
VITE_API_BASE_URL=http://localhost:3000
VITE_DASHBOARD_BASE_URL=http://localhost:5173
VITE_WEBSITE_BASE_URL=http://localhost:5174
```

`.development/packages/tools/.env` :
```env
NODE_ENV="development"
SQL_DATABASE_URL="postgres://postgres:admin@postgres:5432/default"
```

> **Note :** Dans les `.env` Docker, les noms d'hôte utilisent les noms de service Docker (`postgres`, `rustfs`, `mailpit`) au lieu de `localhost`. Les URLs accessibles depuis le navigateur utilisent `localhost`.

### Configuration native (pour développement sur l'hôte)

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

# Adapter selon votre configuration PostgreSQL locale
SQL_DATABASE_URL=postgres://postgres:votre_mot_de_passe@localhost:5432/arrhes_dev

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
SQL_DATABASE_URL=postgres://postgres:votre_mot_de_passe@localhost:5432/arrhes_dev
```

### Configuration avec services externes (Production)

**`packages/api/.env` :**
```env
ENV=production
VERBOSE=false
PORT=3000

CORS_ORIGIN=https://your-domain.com
COOKIES_DOMAIN=your-domain.com
COOKIES_KEY=generate-a-strong-random-key-here-minimum-32-characters

API_BASE_URL=https://api.your-domain.com
PLATFORM_BASE_URL=https://app.your-domain.com
WEBSITE_BASE_URL=https://your-domain.com

SQL_DATABASE_URL=postgres://user:pass@db.provider.com:5432/arrhes?sslmode=require

STORAGE_ENDPOINT=https://s3.eu-west-3.amazonaws.com
STORAGE_BUCKET_NAME=my-arrhes-bucket
STORAGE_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
STORAGE_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

EMAIL_ENDPOINT=smtp.gmail.com
EMAIL_USER=myemail@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

## Sécurité

### Bonnes pratiques

1. **Ne jamais commiter les fichiers `.env`**
   - Vérifiez que `.env` est dans `.gitignore`
   - Utilisez des templates `.env.example` sans valeurs sensibles

2. **Générer des secrets forts**
   ```bash
   # Générer une clé aléatoire pour COOKIES_KEY
   openssl rand -base64 32
   ```

3. **Permissions de fichiers**
   ```bash
   # Restreindre l'accès aux fichiers .env
   chmod 600 packages/api/.env
   chmod 600 packages/tools/.env
   ```

4. **Variables séparées par environnement**
   - Dev : `.env.development`
   - Production : `.env.production`
   - Ne jamais mélanger les credentials

5. **Rotation des secrets**
   - Changez régulièrement `COOKIES_KEY`
   - Renouvelez les clés API et mots de passe
   - Révoquez les accès inutilisés

### Vérification de la configuration

Pour vérifier que toutes les variables sont correctement définies, l'API affichera une erreur au démarrage si des variables sont manquantes ou invalides (validation via Valibot dans `getEnv.ts`).

### Valeurs recommandées

| Variable | Recommandation |
|----------|----------------|
| `COOKIES_KEY` | Minimum 32 caractères aléatoires |
| `SQL_DATABASE_URL` | Connexion SSL en production (`?sslmode=require`) |
| `STORAGE_*` | Credentials avec permissions minimales (lecture/écriture bucket uniquement) |
| `EMAIL_*` | Utiliser des app passwords, pas le mot de passe principal |

---

Pour poursuivre l'installation, consultez [DEVELOPMENT.md](DEVELOPMENT.md).
