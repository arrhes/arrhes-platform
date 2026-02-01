# Arrhes

[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24.5-green.svg)](https://nodejs.org/)

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

- ✅ Configuration et gestion des comptes comptables
- ✅ Création et gestion des écritures comptables en partie double
- ✅ Gestion des pièces justificatives avec stockage sécurisé
- ✅ Configuration et consultation des états financiers (bilan, compte de résultat)
- ✅ Gestion des exercices comptables
- ✅ Gestion multi-utilisateurs avec rôles et permissions
- ✅ Authentification sécurisée par magic link
- ✅ Support des journaux comptables multiples
- ✅ Calculs automatiques et validation des écritures

## Démarrage rapide

> **Windows :** Certains chemins du repository sont longs et peuvent dépasser la limite par défaut de Windows. Avant de cloner, exécutez la commande suivante depuis une invite de commandes **administrateur** :
> ```
> git config --system core.longpaths true
> ```

### Option 1 : Dev Container 🚀 (Le plus simple)

Prérequis : Docker

Quick CLI workflow (no editor integration required):

```bash
# Clone & enter repo
git clone https://github.com/arrhes/arrhes-platform.git
cd arrhes-platform

# Start the devcontainer services (bind-mounts your workspace)
./devcontainer-start.sh

# Bootstrap the workspace (run inside the devcontainer): installs deps, builds metadata, pushes schema and seeds DB
./dev/scripts/initialize.sh

# Open an interactive shell inside the devcontainer (one-line)
docker compose -f .development/compose.yml exec devcontainer bash

# From that shell you can start the dev servers (they must bind to 0.0.0.0 to be reachable from the host):
# API
pnpm --filter api run dev
# Platform (Vite) - ensure host binding
pnpm --filter platform run dev -- --host
# Website (Vite) - ensure host binding
pnpm --filter website run dev -- --host
```

If you prefer to attach VS Code to the running container instead of using an in-container shell, install the "Dev Containers" extension and use "Dev Containers: Attach to Running Container..." then select the `devcontainer` container. Edits are persisted on the host because the service mount `.:/workspace` is a bind mount.



Tout est configuré automatiquement : Node.js, pnpm, PostgreSQL, RustFS, MailHog, et les données de démonstration !

### Option 2 : Avec Docker Compose 🐳

Prérequis : Node.js 24.5+, pnpm, Docker

```bash
# Cloner le repository
git clone https://github.com/arrhes/arrhes-platform.git
cd arrhes-platform

# Installer les dépendances
pnpm install

# Lancer les services (PostgreSQL, RustFS, MailHog)
docker-compose up -d

# Créer le bucket RustFS
# Accéder à http://localhost:9001 (arrhes_rustfs / arrhes_rustfs_secret)
# Créer un bucket nommé "arrhes-files"

# Configurer les variables d'environnement
# Créer packages/api/.env et packages/tools/.env
# (voir la documentation complète)

# Initialiser la base de données
pnpm --filter tools run push
pnpm --filter tools run seed

# Lancer l'application
pnpm run dev
```

### Option 3 : Installation native

Prérequis : Node.js 24.5+, pnpm, PostgreSQL

```bash
# Cloner le repository
git clone https://github.com/arrhes/arrhes-platform.git
cd arrhes-platform

# Installer les dépendances
pnpm install

# Créer la base de données PostgreSQL
# (voir la documentation complète)

# Configurer les variables d'environnement
# Créer packages/api/.env et packages/tools/.env
# (voir la documentation complète)

# Initialiser la base de données
pnpm --filter tools run push
pnpm --filter tools run seed

# Lancer l'application
pnpm run dev
```

L'API sera accessible sur `http://localhost:3101`, la plateforme sur `http://localhost:3101` et le website sur `http://localhost:3102.

**Identifiants de démonstration :** `demo@arrhes.com` / `demo`

**Pour plus de détails, consultez le [Guide de développement](docs/DEVELOPMENT.md).**

## Documentation

- 📚 [Architecture](docs/ARCHITECTURE.md) - Vue d'ensemble de l'architecture et du stack technique
- ⚙️ [Configuration](docs/CONFIGURATION.md) - Variables d'environnement et configuration des services
- 🛠️ [Développement](docs/DEVELOPMENT.md) - Guide complet pour les développeurs
- 🤝 [Contribution](docs/CONTRIBUTING.md) - Guidelines pour contribuer au projet

## Packages

Le projet est organisé en monorepo avec les packages suivants :

- **@arrhes/api** - Backend REST API (Hono, PostgreSQL)
- **@arrhes/platform** - Interface web (React, TanStack Router)
- **@arrhes/application-metadata** - Schémas et modèles partagés (Valibot, Drizzle ORM)
- **@arrhes/tools** - Outils de migration et seed de base de données
- **@arrhes/website** - Site vitrine + Documentation

Pour plus de détails, consultez la [documentation d'architecture](docs/ARCHITECTURE.md).

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

- 🐛 [Signaler un bug](https://github.com/arrhes/arrhes-platform/issues)
- 💡 [Proposer une fonctionnalité](https://github.com/arrhes/arrhes-platform/issues)
- 📧 Contact : contact@arrhes.com

---

Développé avec ❤️ pour la communauté française

