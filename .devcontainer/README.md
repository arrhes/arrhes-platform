# Dev Container Configuration

Ce répertoire contient la configuration pour développer Arrhes dans un Dev Container (VS Code/Cursor).

## Qu'est-ce qu'un Dev Container ?

Un Dev Container est un environnement de développement complet qui s'exécute dans un container Docker. Il offre :
- Une configuration d'environnement reproductible
- Tous les outils nécessaires préinstallés
- Les extensions d'éditeur recommandées
- Un onboarding instantané pour les nouveaux contributeurs

## Fichiers

### `devcontainer.json`
Fichier de configuration principal qui définit :
- Le container de développement à utiliser
- Les ports à exposer
- Les extensions VS Code/Cursor à installer
- Les commandes à exécuter lors de la création/démarrage du container
- Les paramètres de l'éditeur

### `Dockerfile`
Définit l'image Docker pour le container de développement :
- Basé sur l'image officielle Microsoft Node.js + TypeScript
- Installe pnpm globalement
- Installe les outils CLI utiles (PostgreSQL client, curl, vim)

### `post-create.sh`
Script exécuté automatiquement après la création du container :
1. Installe les dépendances pnpm
2. Crée les fichiers `.env` avec les bonnes valeurs
3. Attend que PostgreSQL soit prêt
4. Initialise le schéma de base de données
5. Insère les données de démonstration

## Utilisation

### Première utilisation

1. Ouvrir le projet dans VS Code/Cursor
2. Cliquer sur "Reopen in Container" quand demandé
3. Attendre que le container se construise et se configure (2-5 minutes)
4. Lancer `pnpm run dev`

### Utilisation quotidienne

Le container conserve son état entre les sessions. Lors de la réouverture :
1. Le container redémarre (quelques secondes)
2. Les services (PostgreSQL, MinIO, MailHog) se relancent automatiquement
3. Vous pouvez directement lancer `pnpm run dev`

### Rebuild du container

Si vous modifiez les fichiers de configuration du Dev Container :

**Via VS Code/Cursor :**
- `Cmd/Ctrl + Shift + P`
- "Dev Containers: Rebuild Container"

**Via CLI :**
```bash
docker-compose build devcontainer
```

## Services inclus

Tous les services sont automatiquement démarrés et configurés :

| Service | URL/Port | Credentials |
|---------|----------|-------------|
| PostgreSQL | `postgres:5432` | `arrhes_user` / `arrhes_password` |
| MinIO API | `minio:9000` | `minioadmin` / `minioadmin` |
| MinIO Console | http://localhost:9001 | `minioadmin` / `minioadmin` |
| MailHog SMTP | `mailhog:1025` | - |
| MailHog Web | http://localhost:8025 | - |

**Note :** Dans le Dev Container, les services sont accessibles via leur nom Docker (`postgres`, `minio`, `mailhog`) plutôt que `localhost`.

## Extensions installées

Le Dev Container installe automatiquement :
- **ESLint** : Linting JavaScript/TypeScript
- **Prettier** : Formatage de code
- **GitLens** : Git amélioré
- **Tailwind CSS IntelliSense** : Autocomplétion Tailwind
- **ES7+ React/Redux snippets** : Snippets React
- **SQLTools** + **PostgreSQL Driver** : Client PostgreSQL intégré
- **Docker** : Gestion des containers
- **Error Lens** : Affichage des erreurs inline
- **Path Intellisense** : Autocomplétion des chemins
- **Code Spell Checker** : Vérification orthographique

## Configuration de l'éditeur

Le Dev Container applique automatiquement les paramètres suivants :
- Format on save activé (Prettier)
- ESLint fix on save
- TypeScript workspace version
- Tab size: 4 espaces
- EOL: LF (Unix)

## Personnalisation

### Ajouter une extension

Éditez `.devcontainer/devcontainer.json` :
```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        // ... extensions existantes
        "publisher.extension-name"
      ]
    }
  }
}
```

Puis rebuild le container.

### Modifier la configuration

Pour personnaliser :
- **Environnement** : Modifiez `Dockerfile`
- **Extensions/Settings** : Modifiez `devcontainer.json`
- **Setup initial** : Modifiez `post-create.sh`

Après toute modification, pensez à rebuild le container.

## Troubleshooting

### Le container ne démarre pas
```bash
# Voir les logs du container
docker logs arrhes-devcontainer-1

# Rebuild depuis zéro
docker-compose down -v
docker-compose build --no-cache devcontainer
```

### PostgreSQL n'est pas prêt
```bash
# Vérifier l'état de PostgreSQL
docker-compose ps postgres

# Voir les logs
docker-compose logs postgres

# Redémarrer PostgreSQL
docker-compose restart postgres
```

### Les dépendances ne s'installent pas
```bash
# Dans le terminal du Dev Container
rm -rf node_modules
pnpm install
```

### Réinitialiser complètement
```bash
# Fermer VS Code/Cursor
# Depuis votre machine locale :
docker-compose down -v
# Réouvrir le projet dans le Dev Container
```

## Performance

**Volumes bindés :**
Le projet utilise des volumes "cached" pour de meilleures performances sur macOS/Windows.

**WSL2 (Windows) :**
Pour de meilleures performances, clonez le projet dans le filesystem WSL2 :
```bash
# Dans WSL2
cd ~
git clone https://github.com/arrhes/arrhes-platform.git
code arrhes-platform
```

**macOS :**
Les volumes Docker peuvent être lents. Si vous rencontrez des problèmes de performance, envisagez l'option Docker Compose (sans Dev Container) pour un développement natif.

## Ressources

- [Dev Containers documentation](https://containers.dev/)
- [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Compose documentation](https://docs.docker.com/compose/)

