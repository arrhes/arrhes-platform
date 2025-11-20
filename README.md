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

### Prérequis

- Node.js 24.5+ 
- pnpm
- PostgreSQL

### Installation

```bash
# Cloner le repository
git clone https://github.com/arrhes/arrhes.git
cd arrhes

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp packages/api/.env.example packages/api/.env
cp packages/tools/.env.example packages/tools/.env
# Éditer les fichiers .env avec vos valeurs

# Initialiser la base de données
pnpm --filter tools run push
pnpm --filter tools run seed

# Lancer l'application
pnpm run dev
```

L'API sera accessible sur le port configuré (par défaut `http://localhost:3000`) et la plateforme sur `http://localhost:5173`.

**Identifiants de démonstration :** `demo@arrhes.com` / `demo`

## Documentation

- 📚 [Architecture](docs/ARCHITECTURE.md) - Vue d'ensemble de l'architecture et du stack technique
- ⚙️ [Configuration](docs/CONFIGURATION.md) - Variables d'environnement et configuration des services
- 🛠️ [Développement](docs/DEVELOPMENT.md) - Guide complet pour les développeurs
- 🤝 [Contribution](docs/CONTRIBUTING.md) - Guidelines pour contribuer au projet

## Packages

Le projet est organisé en monorepo avec les packages suivants :

- **@arrhes/api** - Backend REST API (Hono, PostgreSQL)
- **@arrhes/platform** - Interface web (React, TanStack Router)
- **@arrhes/metadata** - Schémas et modèles partagés (Valibot, Drizzle ORM)
- **@arrhes/tools** - Outils de migration et seed de base de données
- **@arrhes/website** - Site vitrine

Pour plus de détails, consultez la [documentation d'architecture](docs/ARCHITECTURE.md).

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

- 🐛 [Signaler un bug](https://github.com/arrhes/arrhes/issues)
- 💡 [Proposer une fonctionnalité](https://github.com/arrhes/arrhes/issues)
- 📧 Contact : demo@arrhes.com

---

Développé avec ❤️ pour la communauté française
