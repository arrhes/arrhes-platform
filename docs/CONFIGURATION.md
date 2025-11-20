# Configuration

Ce document décrit toutes les variables d'environnement et les configurations nécessaires pour faire fonctionner Arrhes en développement local.

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Variables d'environnement - API](#variables-denvironnement---api)
- [Variables d'environnement - Tools](#variables-denvironnement---tools)
- [Configuration PostgreSQL](#configuration-postgresql)
- [Configuration S3 (Stockage)](#configuration-s3-stockage)
- [Configuration SMTP (Email)](#configuration-smtp-email)
- [Exemples de configuration](#exemples-de-configuration)
- [Sécurité](#sécurité)

## Vue d'ensemble

Arrhes nécessite deux fichiers de configuration `.env` :

1. **`packages/api/.env`** : Configuration du backend API
2. **`packages/tools/.env`** : Configuration des outils de base de données

Ces fichiers ne sont **pas versionnés** (`.gitignore`) pour des raisons de sécurité.

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
| `PLATFORM_BASE_URL` | `string` | URL de la plateforme frontend | `http://localhost:5173` |
| `WEBSITE_BASE_URL` | `string` | URL du site vitrine | `http://localhost:5174` |

### Base de données

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `SQL_DATABASE_URL` | `string` | URL de connexion PostgreSQL | `postgres://user:password@localhost:5432/arrhes` |

### Stockage S3

| Variable | Type | Description | Exemple |
|----------|------|-------------|---------|
| `STORAGE_ENDPOINT` | `string` | Endpoint S3 (ou compatible) | `http://localhost:9000` (MinIO) |
| `STORAGE_NAME` | `string` | Nom du bucket S3 | `arrhes-files` |
| `STORAGE_ACCESS_KEY` | `string` | Clé d'accès S3 | `minioadmin` |
| `STORAGE_SECRET_KEY` | `string` | Clé secrète S3 | `minioadmin` |

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
| `DATABASE_URL` | `string` | URL de connexion PostgreSQL | `postgres://user:password@localhost:5432/arrhes` |

**Note :** Cette variable doit être identique à `SQL_DATABASE_URL` de l'API.

## Configuration PostgreSQL

### Installation

**Ubuntu/Debian :**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS (Homebrew) :**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Windows :**
Télécharger l'installeur depuis [postgresql.org](https://www.postgresql.org/download/windows/)

### Création de la base de données

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer un utilisateur
CREATE USER arrhes_user WITH PASSWORD 'your-secure-password';

# Créer la base de données
CREATE DATABASE arrhes OWNER arrhes_user;

# Donner tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE arrhes TO arrhes_user;

# Quitter
\q
```

### URL de connexion

Format : `postgres://[user]:[password]@[host]:[port]/[database]`

Exemple : `postgres://arrhes_user:your-secure-password@localhost:5432/arrhes`

### Vérification de la connexion

```bash
psql postgres://arrhes_user:your-secure-password@localhost:5432/arrhes
```

## Configuration S3 (Stockage)

Le système de stockage utilise l'API AWS S3 mais fonctionne avec n'importe quel service compatible S3.

### Option 1 : MinIO (Développement local recommandé)

**Installation avec Docker :**
```bash
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  -v ~/minio/data:/data \
  quay.io/minio/minio server /data --console-address ":9001"
```

**Configuration :**
```env
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_NAME=arrhes-files
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
```

**Création du bucket :**
1. Accéder à la console MinIO : http://localhost:9001
2. Se connecter avec `minioadmin` / `minioadmin`
3. Créer un bucket nommé `arrhes-files`
4. Configurer la politique en lecture/écriture si nécessaire

### Option 2 : AWS S3 (Production)

**Configuration :**
```env
STORAGE_ENDPOINT=https://s3.eu-west-3.amazonaws.com
STORAGE_NAME=your-bucket-name
STORAGE_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
STORAGE_SECRET_KEY=YOUR_AWS_SECRET_KEY
```

**Prérequis :**
- Créer un bucket S3 dans votre région
- Créer un utilisateur IAM avec les permissions S3 appropriées
- Générer des clés d'accès pour cet utilisateur

### Option 3 : Autre service compatible S3

Cloudflare R2, DigitalOcean Spaces, Scaleway Object Storage, etc. sont également compatibles.

## Configuration SMTP (Email)

L'application envoie des emails pour :
- Magic links d'authentification
- Notifications importantes
- Invitations d'utilisateurs

### Option 1 : Gmail (Développement)

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

### Option 2 : Services SMTP dédiés

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

### Option 3 : Serveur SMTP local (Test)

Pour tester sans envoyer de vrais emails, utilisez [MailHog](https://github.com/mailhog/MailHog) :

```bash
# Avec Docker
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

```env
EMAIL_ENDPOINT=localhost:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
```

Interface web disponible sur http://localhost:8025

## Exemples de configuration

### Configuration complète - Développement local

**`packages/api/.env` :**
```env
# Environnement
ENV=development
VERBOSE=true
PORT=3000

# CORS et Cookies
CORS_ORIGIN=http://localhost:5173
COOKIES_DOMAIN=localhost
COOKIES_KEY=my-super-secret-development-key-at-least-32-chars

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

# Email (MailHog pour test)
EMAIL_ENDPOINT=localhost:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
```

**`packages/tools/.env` :**
```env
DATABASE_URL=postgres://arrhes_user:arrhes_password@localhost:5432/arrhes
```

### Configuration avec services externes

**`packages/api/.env` :**
```env
# Environnement
ENV=development
VERBOSE=true
PORT=3000

# CORS et Cookies
CORS_ORIGIN=http://localhost:5173
COOKIES_DOMAIN=localhost
COOKIES_KEY=generate-a-strong-random-key-here-minimum-32-characters

# URLs
API_BASE_URL=http://localhost:3000
PLATFORM_BASE_URL=http://localhost:5173
WEBSITE_BASE_URL=http://localhost:5174

# Base de données (PostgreSQL hébergé)
SQL_DATABASE_URL=postgres://user:pass@db.provider.com:5432/arrhes

# Stockage AWS S3
STORAGE_ENDPOINT=https://s3.eu-west-3.amazonaws.com
STORAGE_NAME=my-arrhes-bucket
STORAGE_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
STORAGE_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Email (Gmail)
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
