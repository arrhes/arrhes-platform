# Arrhes

[![Licence AGPL-3.0](https://img.shields.io/badge/licence-AGPL--3.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-25-green.svg)](https://nodejs.org/)

Application **open source** de gestion de comptabilité en partie double pour les associations et entreprises françaises. Elle permet de configurer les comptes, d'ajouter les écritures comptables, les pièces justificatives et de consulter les différents états financiers tels que le bilan ou le compte de résultat.

## Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Démarrage rapide](#démarrage-rapide)
- [Documentation](#documentation)
- [Licence](#licence)
- [Support](#support)

## À propos

Arrhes est une solution complète de comptabilité conçue spécifiquement pour répondre aux besoins des associations et entreprises françaises. L'application adopte une architecture monorepo et une interface utilisateur simple et intuitive.

**Public cible :**
- Associations loi 1901
- Petites et moyennes entreprises
- Comptables et experts-comptables
- Trésoriers d'associations

## Fonctionnalités

- Configuration et gestion des comptes comptables
- Création et gestion des écritures comptables en partie double
- Gestion des pièces justificatives avec stockage sécurisé
- Configuration et consultation des états financiers (bilan, compte de résultat)
- Gestion des exercices comptables
- Gestion multi-utilisateurs avec rôles et permissions
- Authentification sécurisée par magic link
- Support des journaux comptables multiples
- Calculs automatiques et validation des écritures

## Démarrage rapide

> **Windows :** Certains chemins du repository sont longs et peuvent dépasser la limite par défaut de Windows. Avant de cloner, exécutez la commande suivante depuis une invite de commandes **administrateur** :
> ```
> git config --system core.longpaths true
> ```

### Option 1 : Docker (recommandé)

Prérequis : **Docker** et **Docker Compose** v2+ ([installer Docker](https://www.docker.com/get-started))

```bash
# Cloner le repository
git clone https://github.com/arrhes/arrhes-platform.git
cd arrhes-platform

# Démarrer tous les services (build + démarrage)
docker compose --project-directory=".development" --file=".development/compose.yml" --project-name="arrhes-application" up -d --build
```

C'est tout. Cette commande :
1. Construit les images Docker (API + Dashboard)
2. Démarre l'infrastructure (PostgreSQL, RustFS, Mailpit)
3. Installe les dépendances (pnpm install)
4. Build le package metadata
5. Applique le schéma de base de données (Drizzle push)
6. Insère les données de démonstration (seed)
7. Lance les serveurs de développement avec hot-reload

> **Optionnel :** Si vous installez [just](https://github.com/casey/just), vous pouvez utiliser `just dev-up` comme raccourci.

**Services accessibles :**

| Service | URL | Description | Identifiants |
|---|---|---|---|
| Dashboard | http://localhost:5173 | Interface web d'administration de la comptabilité | `demo@arrhes.com` / `demo` |
| API | http://localhost:3000 | Backend REST qui gère l'authentification, les écritures et les états financiers | - |
| PostgreSQL | `localhost:5432` | Base de données relationnelle stockant toutes les données de l'application | user: `postgres`, password: `admin`, db: `default` |
| RustFS Console | http://localhost:9001 | Stockage S3-compatible pour les pièces justificatives (factures, reçus, etc.) | `rustfsadmin` / `rustfsadmin` |
| Mailpit Web UI | http://localhost:8025 | Serveur SMTP de test qui capture les emails (magic links, invitations) sans les envoyer | - |

> **Premier lancement :** Créez le bucket `arrhes-files` dans la console RustFS (http://localhost:9001).

**Commandes utiles :**

```bash
# Voir les logs
docker compose --project-directory=".development" --file=".development/compose.yml" --project-name="arrhes-application" logs -f

# Arrêter les services
docker compose --project-directory=".development" --file=".development/compose.yml" --project-name="arrhes-application" down

# Redémarrer les services (sans rebuild)
docker compose --project-directory=".development" --file=".development/compose.yml" --project-name="arrhes-application" up -d

# Réinitialiser la base de données
docker compose --project-directory=".development" --file=".development/compose.yml" --project-name="arrhes-application" exec api sh -c "cd /workspace/packages/tools && pnpm run reset"
```

> **Note :** `up -d --build` reconstruit les images Docker et réinstalle les dépendances (~1-2 min). `up -d` sans `--build` redémarre les containers existants sans réinstaller (~10s). Utilisez `--build` uniquement après avoir modifié un Dockerfile ou pour un premier lancement.

### Option 2 : Développement natif

Prérequis : **Node.js** 25+, **pnpm** 10+, **PostgreSQL** 16+

```bash
# Cloner le repository
git clone https://github.com/arrhes/arrhes-platform.git
cd arrhes-platform

# Installer les dépendances
pnpm install

# Construire le package metadata (requis par les autres packages)
pnpm --filter @arrhes/application-metadata run build

# Configurer les variables d'environnement
# Créer packages/api/.env et packages/tools/.env
# (voir docs/CONFIGURATION.md)

# Initialiser la base de données
pnpm --filter @arrhes/application-tools run push
pnpm --filter @arrhes/application-tools run seed

# Lancer l'application
pnpm run dev
```

L'API sera accessible sur http://localhost:3000 et le dashboard sur http://localhost:5173.

**Identifiants de démonstration :** `demo@arrhes.com` / `demo`

**Pour plus de détails, consultez le [Guide de développement](docs/DEVELOPMENT.md).**

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - Vue d'ensemble de l'architecture et du stack technique
- [Configuration](docs/CONFIGURATION.md) - Variables d'environnement et configuration des services
- [Développement](docs/DEVELOPMENT.md) - Guide complet pour les développeurs
- [Contribution](docs/CONTRIBUTING.md) - Guidelines pour contribuer au projet

## Packages

Le projet est organisé en monorepo avec les packages suivants :

- **@arrhes/application-api** - Backend REST API (Hono, PostgreSQL)
- **@arrhes/application-dashboard** - Interface web d'administration (React, TanStack Router)
- **@arrhes/application-metadata** - Schémas et modèles partagés (Valibot, Drizzle ORM)
- **@arrhes/application-tools** - Outils de migration et seed de base de données
- **@arrhes/ui** - Composants UI partagés (Panda CSS, Radix UI)

Pour plus de détails, consultez la [documentation d'architecture](docs/ARCHITECTURE.md).

## Licence

Ce projet est sous licence AGPL-3.0. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

- [Signaler un bug](https://github.com/arrhes/arrhes-platform/issues)
- [Proposer une fonctionnalité](https://github.com/arrhes/arrhes-platform/issues)
- Contact : contact@arrhes.com
