# Architecture

Ce document décrit l'architecture globale du projet Arrhes, un système de comptabilité en partie double pour associations et entreprises françaises.

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture monorepo](#architecture-monorepo)
- [Packages](#packages)
- [Stack technique](#stack-technique)
- [Flux de données](#flux-de-données)
- [Authentification](#authentification)
- [Base de données](#base-de-données)

## Vue d'ensemble

Arrhes est construit sur une architecture monorepo moderne utilisant **pnpm workspaces**. Le projet est divisé en plusieurs packages indépendants mais interconnectés, chacun ayant une responsabilité spécifique.

```
┌─────────────────────────────────────────────────────────┐
│                      Utilisateurs                       │
└────────────────────────────┬────────────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │   @arrhes/platform  │  (Frontend React)
                  │   Port: 5173        │
                  └──────────┬──────────┘
                             │
                             │ HTTP/REST
                             │
                  ┌──────────▼──────────┐
                  │    @arrhes/api      │  (Backend Hono)
                  │   Port: 3000        │
                  └──────────┬──────────┘
                             │
                 ┌───────────┼───────────┐
                 │           │           │
            ┌────▼────┐  ┌───▼────┐  ┌───▼────┐
            │   DB    │  │   S3   │  │  SMTP  │
            │ (SQL)   │  │ (File) │  │ (Mail) │
            └─────────┘  └────────┘  └────────┘
```

## Architecture monorepo

Le projet utilise **pnpm workspaces** pour gérer plusieurs packages dans un seul repository. Cette approche offre plusieurs avantages :

- **Partage de code** : Les packages peuvent facilement partager du code via `@arrhes/application-metadata`
- **Dépendances optimisées** : pnpm déduplique les dépendances communes
- **Développement simplifié** : Build et développement coordonnés entre packages
- **Versioning cohérent** : Toutes les parties du projet évoluent ensemble

### Structure du workspace

```
arrhes/
├── packages/
│   ├── api/          # Backend API
│   ├── platform/     # Interface utilisateur
│   ├── metadata/     # Schémas et types partagés
│   ├── tools/        # Outils de migration DB
│   └── website/      # Site vitrine
├── pnpm-workspace.yaml
└── package.json
```

## Packages

### @arrhes/api

**Rôle :** Backend REST API pour toutes les opérations métier

**Technologies :**
- **Hono** : Framework web léger et performant
- **TypeScript** : Typage statique
- **Drizzle ORM** : ORM pour PostgreSQL
- **Valibot** : Validation des données
- **Nodemailer** : Envoi d'emails
- **AWS SDK** : Stockage de fichiers (S3-compatible)
- **Puppeteer** : Génération de PDF

**Structure :**
```
api/src/
├── api.ts              # Configuration de l'app Hono
├── server.ts           # Point d'entrée du serveur
├── clients/            # Clients pour services externes
│   ├── sqlClient.ts
│   ├── emailClient.ts
│   └── storageClient.ts
├── factories/          # Factories Hono avec types
│   ├── apiFactory.ts
│   ├── authFactory.ts
│   └── publicFactory.ts
├── middlewares/        # Middlewares d'authentification
│   ├── authMiddleware.ts
│   ├── publicMiddleware.ts
│   └── userVerificationMiddleware.ts
├── routes/             # Routes de l'API
│   ├── auth/           # Routes authentifiées
│   │   ├── organizations/  # Gestion organisations
│   │   ├── settings/       # Paramètres utilisateur
│   │   └── support/        # Support
│   └── public/         # Routes publiques
│       ├── signIn.ts
│       ├── signUp.ts
│       ├── signOut.ts
│       └── sendMagicLink.ts
└── utilities/          # Utilitaires
    ├── email/          # Templates et envoi emails
    ├── sql/            # Helpers SQL
    ├── storage/        # Helpers S3
    ├── cookies/        # Gestion cookies sécurisés
    └── workspace/      # Logique métier
```

**Points d'entrée :**
- `server.ts` : Lance le serveur HTTP
- `api.ts` : Configure l'application Hono avec middlewares et routes

**Responsabilités :**
- Gestion de l'authentification (magic links, sessions)
- CRUD pour toutes les entités (organisations, comptes, écritures, etc.)
- Validation des écritures comptables
- Génération des états financiers
- Gestion des pièces justificatives (upload/download via S3)
- Envoi d'emails transactionnels

### @arrhes/platform

**Rôle :** Interface utilisateur web pour interagir avec l'application

**Technologies :**
- **React 19** : Framework UI
- **TanStack Router** : Routing type-safe
- **TanStack Query** : Gestion d'état serveur et cache
- **TanStack Table** : Tableaux de données performants
- **TanStack Virtual** : Virtualisation pour grandes listes
- **Radix UI** : Composants accessibles headless
- **Tailwind CSS** : Framework CSS utility-first
- **React Hook Form** : Gestion de formulaires
- **Valibot** : Validation côté client
- **Vite** : Build tool et dev server

**Structure :**
```
platform/src/
├── root.tsx            # Point d'entrée React
├── index.html          # HTML principal
├── assets/             # Ressources statiques
│   ├── css/
│   ├── fonts/
│   ├── images/
│   └── manifest/       # PWA manifest
├── components/         # Composants réutilisables
│   ├── buttons/
│   ├── formats/        # Formatage de données
│   ├── forms/
│   ├── inputs/
│   ├── layouts/
│   └── overlays/       # Modals, dropdowns, tooltips
├── contexts/           # Contexts React
│   ├── data/           # Context de données globales
│   ├── router/         # Configuration du router
│   └── toasts/         # Notifications
├── features/           # Features par domaine métier
│   ├── authLayout.tsx
│   ├── organizations/  # Gestion organisations
│   ├── settings/
│   ├── signIn/
│   ├── signUp/
│   └── support/
├── routes/             # Définition des routes
│   ├── platformRouter.tsx
│   ├── platformTree.ts
│   └── root/           # Routes de l'app
└── utilities/          # Utilitaires
    ├── postAPI.ts      # Client API
    ├── useHTTPData.ts  # Hook pour data fetching
    └── cookies/        # Gestion cookies
```

**Responsabilités :**
- Interface utilisateur complète
- Formulaires de saisie avec validation
- Tableaux de données avec tri, filtrage, pagination
- Visualisation des états financiers
- Gestion des documents et pièces justificatives
- Notifications et retours utilisateur

### @arrhes/application-metadata

**Rôle :** Package partagé contenant tous les schémas, modèles et types utilisés par l'API et la plateforme

**Technologies :**
- **Drizzle ORM** : Définition des schémas de base de données
- **Valibot** : Schémas de validation
- **TypeScript** : Types partagés

**Structure :**
```
metadata/src/
├── models/             # Modèles Drizzle ORM
│   ├── user.ts
│   ├── organization.ts
│   ├── account.ts
│   ├── journal.ts
│   ├── record.ts       # Écritures comptables
│   ├── recordRow.ts    # Lignes d'écriture
│   ├── document.ts
│   ├── attachment.ts
│   ├── year.ts
│   ├── balanceSheet.ts
│   ├── incomeStatement.ts
│   └── computation.ts
├── schemas/            # Schémas Valibot pour validation
│   └── [mêmes fichiers que models/]
├── routes/             # Définitions de routes typées
│   ├── auth/
│   └── public/
├── components/         # Composants métier partagés
│   ├── models/
│   ├── schemas/
│   └── values/         # Valeurs par défaut et constantes
└── utilities/          # Utilitaires
    ├── generate.ts
    ├── generateId.ts
    └── routeDefinition.ts
```

**Exports :**
```typescript
// Utilisable par l'API et la plateforme
import { models } from '@arrhes/application-metadata/models'
import { schemas } from '@arrhes/application-metadata/schemas'
import { routes } from '@arrhes/application-metadata/routes'
import { generateId } from '@arrhes/application-metadata/utilities'
```

**Responsabilités :**
- Définition unique des schémas de base de données
- Validation cohérente des données entre frontend et backend
- Types TypeScript partagés
- Génération d'IDs uniques (nanoid)
- Définitions de routes type-safe

### @arrhes/tools

**Rôle :** Outils de gestion de la base de données (migrations, seed, maintenance)

**Technologies :**
- **Drizzle Kit** : CLI pour migrations
- **tsx** : Exécution TypeScript
- **Postgres** : Client PostgreSQL

**Scripts disponibles :**
```bash
# Générer les migrations depuis le schéma
pnpm --filter tools run generate

# Pousser le schéma directement vers la DB
pnpm --filter tools run push

# Appliquer les migrations
pnpm --filter tools run migrate

# Seed avec données de démonstration
pnpm --filter tools run seed

# Vider la base de données
pnpm --filter tools run clear

# Reset complet (clear + push + seed)
pnpm --filter tools run reset

# Supprimer les migrations
pnpm --filter tools run drop
```

**Structure :**
```
tools/src/
├── env.ts              # Configuration environnement
├── schemas.ts          # Import des schémas metadata
├── migrate.ts          # Script de migration
├── clearDB.ts          # Script de nettoyage
└── seed/               # Scripts de seed
    ├── seed.ts         # Seed principal
    ├── migration.ts    # Migrations de données
    ├── records2022.ts  # Données exemple 2022
    └── records2023.ts  # Données exemple 2023
```

**Responsabilités :**
- Gestion du schéma de base de données
- Migrations de structure et de données
- Génération de données de test
- Maintenance de la base de données

### @arrhes/website

**Rôle :** Site vitrine pour présenter l'application

**Technologies :**
- **React** : Framework UI
- **Vite** : Build tool

**Note :** Package actuellement minimal, prévu pour évoluer en site marketing/landing page.

## Stack technique

### Backend (API)

| Composant | Technologie | Rôle |
|-----------|-------------|------|
| Runtime | Node.js 24.5+ | Environnement d'exécution |
| Language | TypeScript 5.9 | Langage de programmation |
| Framework | Hono 4.9 | Framework web minimaliste |
| ORM | Drizzle 0.44 | Mapping objet-relationnel |
| Validation | Valibot 1.1 | Validation de schémas |
| Database | PostgreSQL | Base de données relationnelle |
| Storage | AWS S3 SDK | Stockage de fichiers |
| Email | Nodemailer 7.0 | Envoi d'emails |
| PDF | Puppeteer 24.22 | Génération de PDF |

### Frontend (Platform)

| Composant | Technologie | Rôle |
|-----------|-------------|------|
| Framework | React 19.1 | UI framework |
| Routing | TanStack Router 1.132 | Routing type-safe |
| State | TanStack Query 5.90 | Server state management |
| Tables | TanStack Table 8.21 | Data tables |
| Virtual | TanStack Virtual 3.13 | Virtualisation listes |
| UI | Radix UI | Composants accessibles |
| Styling | Tailwind CSS 4.1 | CSS utility-first |
| Forms | React Hook Form 7.63 | Gestion de formulaires |
| Validation | Valibot 1.1 | Validation client-side |
| Icons | Tabler Icons 3.35 | Icônes |
| Build | Vite 7.1 | Build tool moderne |

### Tooling

| Outil | Version | Rôle |
|-------|---------|------|
| pnpm | Latest | Package manager |
| TypeScript | 5.9 | Compilateur TypeScript |
| ESLint | 9.36 | Linter JavaScript/TypeScript |
| Drizzle Kit | 0.31 | Migrations de base de données |
| tsx | 4.20 | Exécution TypeScript |

## Flux de données

### Authentification par Magic Link

```
1. Utilisateur entre son email
   └─> POST /api/public/sendMagicLink
       └─> Génération token + envoi email
       
2. Utilisateur clique sur le lien
   └─> GET /api/public/signIn?token=xxx
       └─> Validation token
       └─> Création session
       └─> Cookie sécurisé (httpOnly, signed)
       └─> Redirection vers plateforme
       
3. Requêtes authentifiées
   └─> Cookie envoyé automatiquement
       └─> authMiddleware vérifie session
       └─> Accès aux routes protégées
```

### CRUD standard

```
Platform                    API                      Database
────────────────────────────────────────────────────────────
1. User action
   └─> postAPI()
       └─> POST /api/auth/...
           └─> authMiddleware
               └─> Validation données (Valibot)
                   └─> Drizzle ORM
                       └─> SQL Query
                           └─> PostgreSQL
                           
2. Response
   ┌─ JSON
   └─ TanStack Query cache
      └─ Invalidation automatique
         └─ Re-fetch et mise à jour UI
```

### Upload de fichiers

```
1. Sélection fichier
   └─> Demande URL signée PUT
       └─> POST /api/auth/.../generatePutSignedUrl
           └─> S3 génère URL temporaire (expires 15min)
           
2. Upload direct vers S3
   └─> PUT https://s3.../file
       (pas de passage par l'API)
       
3. Sauvegarde référence
   └─> POST /api/auth/.../attachment
       └─> Stocke storageKey en DB
```

### Download de fichiers

```
1. Demande URL signée GET
   └─> POST /api/auth/.../generateGetSignedUrl
       └─> S3 génère URL temporaire (expires 1h)
       
2. Download direct depuis S3
   └─> GET https://s3.../file
       (pas de passage par l'API)
```

## Authentification

### Stratégie

Arrhes utilise une **authentification par magic link** (lien temporaire envoyé par email) combinée à des **sessions persistantes** côté serveur.

### Flow complet

1. **Inscription** (`/api/public/signUp`)
   - Validation email + alias
   - Hash du mot de passe (PBKDF2, 128000 itérations)
   - Création user
   - Envoi email de vérification

2. **Connexion** (`/api/public/sendMagicLink`)
   - Génération token de vérification unique
   - Stockage temporaire en DB
   - Envoi email avec lien

3. **Validation** (`/api/public/signIn`)
   - Vérification du token
   - Création d'une session
   - Cookie signé et httpOnly
   - Redirection vers l'application

4. **Requêtes authentifiées**
   - Cookie envoyé automatiquement
   - `authMiddleware` vérifie la session
   - Charge l'utilisateur en contexte
   - Vérifie l'appartenance à l'organisation si nécessaire

5. **Déconnexion** (`/api/public/signOut`)
   - Suppression de la session en DB
   - Suppression du cookie

### Sécurité

- **Cookies signés** : Vérification de l'intégrité avec `COOKIES_KEY`
- **httpOnly** : Protection contre XSS
- **sameSite** : Protection contre CSRF
- **CORS configuré** : Origine autorisée uniquement
- **Tokens temporaires** : Expiration des magic links
- **Hashing sécurisé** : PBKDF2 avec salt unique par utilisateur

## Base de données

### Schéma principal

Le schéma PostgreSQL contient les tables suivantes (via Drizzle ORM) :

**Utilisateurs et organisations :**
- `user` : Utilisateurs de l'application
- `organization` : Organisations (entreprises/associations)
- `organizationUser` : Relation many-to-many avec rôles
- `userSession` : Sessions actives

**Comptabilité :**
- `year` : Exercices comptables
- `account` : Plan comptable
- `journal` : Journaux comptables
- `record` : Écritures comptables
- `recordRow` : Lignes d'écriture (débit/crédit)
- `document` : Documents comptables
- `attachment` : Pièces justificatives

**États financiers :**
- `balanceSheet` : Configuration du bilan
- `incomeStatement` : Configuration du compte de résultat
- `computation` : Calculs personnalisés
- `computationIncomeStatement` : Relation calculs/compte de résultat

### Relations clés

```
organization 1──n organizationUser n──1 user
     │
     ├── 1──n year
     ├── 1──n account
     ├── 1──n journal
     └── 1──n document
              │
              └── 1──n record
                       │
                       └── 1──n recordRow
                                    │
                                    └── n──1 account
```

### Migrations

Les migrations sont gérées par **Drizzle Kit** :
- Le schéma source est défini dans `@arrhes/application-metadata`
- Drizzle Kit génère automatiquement les migrations SQL
- Application via `drizzle-kit migrate` ou `push` (dev)

## Diagramme de dépendances

```
@arrhes/platform ──depends on──> @arrhes/application-metadata
                                        ▲
                                        │
@arrhes/api      ──depends on───────────┘
                                        ▲
                                        │
@arrhes/tools    ──depends on───────────┘

@arrhes/website  (indépendant)
```

Tous les packages dépendent de `@arrhes/application-metadata` pour partager les schémas, modèles et types. Cette architecture assure une cohérence totale entre le frontend et le backend.

---

Pour plus d'informations sur la configuration, consultez [CONFIGURATION.md](CONFIGURATION.md).
