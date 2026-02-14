# Guide de contribution

Merci de votre intérêt pour contribuer à Arrhes ! Ce document explique comment participer au développement du projet.

## Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Configuration de l'environnement](#configuration-de-lenvironnement)
- [Standards de code](#standards-de-code)
- [Convention de commits](#convention-de-commits)
- [Process de pull request](#process-de-pull-request)
- [Tests](#tests)
- [Code review](#code-review)
- [Signaler un bug](#signaler-un-bug)
- [Proposer une fonctionnalité](#proposer-une-fonctionnalité)

## Code de conduite

En participant à ce projet, vous vous engagez à maintenir un environnement respectueux et inclusif. Nous attendons de tous les contributeurs :

- Respect et courtoisie envers les autres contributeurs
- Ouverture d'esprit face aux critiques constructives
- Concentration sur ce qui est le mieux pour la communauté
- Empathie envers les autres membres de la communauté

Les comportements inacceptables incluent le harcèlement, les insultes, et tout comportement discriminatoire.

## Comment contribuer

Il existe plusieurs façons de contribuer à Arrhes :

### 🐛 Signaler des bugs
Ouvrez une issue sur GitHub avec le label `bug`

### 💡 Proposer des fonctionnalités
Ouvrez une issue sur GitHub avec le label `enhancement`

### 📝 Améliorer la documentation
La documentation est aussi importante que le code !

### 💻 Contribuer du code
Suivez le process décrit dans ce document

### 🌍 Traductions
Aidez à traduire l'application dans d'autres langues

### 🎨 Design et UX
Proposez des améliorations d'interface

## Configuration de l'environnement

Avant de commencer à contribuer, configurez votre environnement de développement :

1. **Fork le repository** sur votre compte GitHub

2. **Cloner votre fork**
   ```bash
   git clone https://github.com/votre-username/arrhes.git
   cd arrhes
   ```

3. **Ajouter le repository principal comme remote**
   ```bash
   git remote add upstream https://github.com/arrhes/platform.git
   ```

4. **Choisir votre méthode de développement**

   **Option A : Dev Container (Recommandé pour les nouveaux contributeurs) 🚀**
   
   C'est la méthode la plus simple pour démarrer rapidement :
   
   ```bash
   # Ouvrir dans VS Code/Cursor
   code .  # ou cursor .
   
   # Cliquer sur "Reopen in Container" quand demandé
   # Tout sera configuré automatiquement !
   ```
   
   **Option B : Docker Compose**
   
   ```bash
   # Installer les dépendances
   pnpm install
   
   # Lancer les services
   docker-compose up -d
   
   # Configurer l'environnement
   # Suivez les instructions dans DEVELOPMENT.md
   ```
   
   **Option C : Installation native**
   
   ```bash
   # Installer les dépendances
   pnpm install
   
   # Configurer l'environnement
   # Suivez les instructions complètes dans DEVELOPMENT.md
   ```

5. **Créer une branche pour votre contribution**
   ```bash
   git checkout -b feature/ma-fonctionnalite
   # ou
   git checkout -b fix/mon-correctif
   ```

Pour plus de détails, consultez [DEVELOPMENT.md](DEVELOPMENT.md).

## Standards de code

### TypeScript

- **Utiliser TypeScript strict** : Pas de `any`, sauf exception justifiée
- **Typage explicite** pour les fonctions publiques
- **Interfaces vs Types** : Préférer `type` pour les objets simples, `interface` pour l'extension

**Bon exemple :**
```typescript
type User = {
  id: string
  email: string
  alias: string
}

function createUser(data: { email: string, alias: string }): User {
  return {
    id: generateId(),
    ...data,
  }
}
```

**Mauvais exemple :**
```typescript
function createUser(data: any) {  // ❌ any
  return {
    id: generateId(),
    ...data,
  }
}
```

### Naming conventions

- **Variables et fonctions** : `camelCase`
- **Types et interfaces** : `PascalCase`
- **Constantes** : `UPPER_SNAKE_CASE` (si vraiment constante)
- **Fichiers** : `camelCase.ts`
- **Composants React** : `PascalCase.tsx`

```typescript
// Variables et fonctions
const userName = 'John'
function getUserById(id: string) { }

// Types
type UserProfile = { }
interface ApiResponse { }

// Constantes
const MAX_RETRY_COUNT = 3

// Fichiers
// api/routes/auth/userProfile.ts
// platform/components/buttons/PrimaryButton.tsx
```

### Structure du code

**Ordre des imports :**
```typescript
// 1. Imports de packages externes
import { Hono } from 'hono'
import * as v from 'valibot'

// 2. Imports de workspace packages
import { models } from '@arrhes/application-metadata/models'
import { schemas } from '@arrhes/application-metadata/schemas'

// 3. Imports relatifs du package actuel
import { authFactory } from '#/factories/authFactory.js'
import { validate } from '#/utilities/validate.js'
```

**Ordre dans les fichiers :**
```typescript
// 1. Imports
import { ... } from '...'

// 2. Types et interfaces
type MyType = { }

// 3. Constantes
const MY_CONSTANT = 'value'

// 4. Fonctions/composants
export function myFunction() { }

// 5. Export par défaut (si applicable)
export default MyComponent
```

### ESLint

Le projet utilise ESLint pour maintenir la qualité du code.

**Vérifier le linting :**
```bash
pnpm --filter platform run lint
```

**Fix automatique :**
```bash
pnpm --filter platform run lint --fix
```

**Configuration :**
- ESLint est configuré pour TypeScript et React
- Les règles sont définies dans `packages/platform/eslint.config.js`

### Formatage

**Indentation :** 4 espaces (pas de tabs)

**Longueur de ligne :** Pas de limite stricte, mais restez raisonnable (~120 caractères)

**Points-virgules :** Non requis (sauf cas spécifiques)

**Quotes :** Simples `'` ou doubles `"` (soyez cohérent dans un fichier)

**Trailing commas :** Oui pour les objets et arrays multilignes

```typescript
const user = {
    id: '123',
    name: 'John',
    email: 'john@example.com',  // trailing comma
}
```

### React

**Composants fonctionnels uniquement**
```typescript
export function MyComponent() {
  return <div>Hello</div>
}
```

**Hooks en début de composant**
```typescript
export function MyComponent() {
  // Hooks en premier
  const [state, setState] = useState()
  const query = useQuery()
  
  // Puis logique
  const handleClick = () => { }
  
  // Puis render
  return <div>...</div>
}
```

**Props destructurées**
```typescript
export function MyComponent({ title, description, onClose }: MyComponentProps) {
  return <div>{title}</div>
}
```

**Éviter les inline styles** (utiliser Panda CSS)
```typescript
// ✅ Bon
<div className="flex items-center gap-2">

// ❌ Éviter
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
```

## Convention de commits

Nous utilisons une convention de commits inspirée de [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <description>

[corps optionnel]

[footer optionnel]
```

### Types

- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation uniquement
- `style` : Formatage, points-virgules manquants, etc.
- `refactor` : Refactoring sans changement de fonctionnalité
- `perf` : Amélioration de performance
- `test` : Ajout ou correction de tests
- `chore` : Maintenance, dépendances, etc.

### Scopes (optionnel)

- `api` : Backend
- `platform` : Frontend
- `metadata` : Package metadata
- `tools` : Outils de base de données
- `docs` : Documentation

### Exemples

```bash
# Nouvelle fonctionnalité
git commit -m "feat(platform): add dark mode toggle"

# Correction de bug
git commit -m "fix(api): correct balance calculation in income statement"

# Documentation
git commit -m "docs: update installation instructions"

# Refactoring
git commit -m "refactor(api): extract email templates to separate files"

# Maintenance
git commit -m "chore(deps): update drizzle to v0.45"
```

### Description

- Utiliser l'impératif ("add" et non "added" ou "adds")
- Pas de majuscule au début
- Pas de point à la fin
- Maximum 72 caractères

### Corps du commit (optionnel)

Pour les changements complexes, ajoutez un corps explicatif :

```
feat(api): add export to Excel functionality

Implement Excel export for financial statements using ExcelJS library.
Users can now export balance sheets and income statements.

- Add ExcelJS dependency
- Create export utility functions
- Add export routes for both statement types
- Update documentation
```

## Process de pull request

### 1. Vérifier avant de soumettre

```bash
# Vérifier que tout compile
pnpm run build

# Vérifier le linting (pour platform)
pnpm --filter platform run lint

# Tester manuellement les changements
pnpm run dev
```

### 2. Mettre à jour votre branche

```bash
# Récupérer les derniers changements
git fetch upstream
git rebase upstream/main
```

### 3. Pousser votre branche

```bash
git push origin feature/ma-fonctionnalite
```

### 4. Créer la pull request

Sur GitHub :
1. Cliquez sur "New Pull Request"
2. Sélectionnez votre branche
3. Remplissez le template de PR :

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Mon code suit les standards du projet
- [ ] J'ai commenté les parties complexes
- [ ] J'ai mis à jour la documentation si nécessaire
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] J'ai testé localement

## Screenshots (si applicable)
```

### 5. Attendre la review

- Un mainteneur reviewera votre PR
- Répondez aux commentaires et effectuez les modifications demandées
- Une fois approuvée, votre PR sera mergée

## Tests

Actuellement, le projet n'a pas de suite de tests automatisés. Les contributions pour ajouter des tests sont bienvenues !

### Tests manuels requis

Avant de soumettre une PR, testez manuellement :

1. **Fonctionnalité ajoutée/modifiée** : Vérifiez qu'elle fonctionne comme prévu
2. **Régressions** : Vérifiez que vous n'avez rien cassé
3. **Cas limites** : Testez les edge cases (valeurs vides, très grandes, etc.)
4. **Différents navigateurs** : Chrome, Firefox, Safari (si frontend)

### Tests futurs

Nous prévoyons d'ajouter :
- Tests unitaires (Vitest)
- Tests d'intégration (Playwright)
- Tests E2E (Playwright)

Les contributions dans ce sens sont encouragées !

## Code review

### Pour les reviewers

- Soyez constructif et respectueux
- Expliquez le "pourquoi" de vos suggestions
- Distinguez les suggestions obligatoires des optionnelles
- Approuvez si les changements sont satisfaisants

### Pour les auteurs de PR

- Ne prenez pas les commentaires personnellement
- Répondez à tous les commentaires (même avec "Done" ou "Fixed")
- Demandez des clarifications si nécessaire
- Remerciez les reviewers pour leur temps

## Signaler un bug

Pour signaler un bug, ouvrez une issue sur GitHub avec :

### Titre
Résumé clair et concis du problème

### Description
- **Description du bug** : Que se passe-t-il ?
- **Comportement attendu** : Que devrait-il se passer ?
- **Étapes pour reproduire** :
  1. Aller sur '...'
  2. Cliquer sur '...'
  3. Voir l'erreur
- **Screenshots** : Si applicable
- **Environnement** :
  - OS : [ex: Ubuntu 22.04]
  - Navigateur : [ex: Chrome 120]
  - Version Node.js : [ex: 24.5.0]
  - Version : [ex: commit SHA ou release]

### Exemple

```markdown
**Description**
Le calcul du compte de résultat affiche des montants négatifs incorrects.

**Comportement attendu**
Les charges doivent apparaître en positif et être soustraites du résultat.

**Étapes pour reproduire**
1. Créer un exercice comptable
2. Ajouter des écritures de charges
3. Consulter le compte de résultat
4. Observer que les montants sont négatifs

**Screenshots**
[capture d'écran]

**Environnement**
- OS: macOS 14.2
- Navigateur: Firefox 121
- Version: commit abc123
```

## Proposer une fonctionnalité

Pour proposer une nouvelle fonctionnalité, ouvrez une issue sur GitHub avec :

### Titre
Description claire de la fonctionnalité

### Description
- **Problème à résoudre** : Quel besoin cette fonctionnalité comble-t-elle ?
- **Solution proposée** : Comment voyez-vous cette fonctionnalité ?
- **Alternatives considérées** : Avez-vous pensé à d'autres approches ?
- **Contexte supplémentaire** : Captures d'écran, exemples d'autres apps, etc.

### Exemple

```markdown
**Problème**
Les utilisateurs ne peuvent pas exporter les données comptables pour les traiter dans Excel.

**Solution proposée**
Ajouter un bouton "Exporter en Excel" sur chaque état financier qui génère un fichier .xlsx avec les données formatées.

**Alternatives considérées**
- Export CSV : Moins convivial mais plus simple à implémenter
- Export PDF : Déjà disponible, mais pas éditable

**Contexte**
Plusieurs utilisateurs ont demandé cette fonctionnalité pour faire des analyses complémentaires.
```

## Ressources additionnelles

- [Documentation d'architecture](ARCHITECTURE.md)
- [Guide de développement](DEVELOPMENT.md)
- [Configuration](CONFIGURATION.md)
- [Issues GitHub](https://github.com/arrhes/platform/issues)
- [Discussions GitHub](https://github.com/arrhes/platform/discussions)

## Questions ?

Si vous avez des questions sur la contribution, n'hésitez pas à :
- Ouvrir une discussion sur GitHub
- Contacter les mainteneurs
- Consulter les issues et PR existantes

Merci de contribuer à Arrhes ! 🎉
