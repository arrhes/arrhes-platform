#!/bin/bash
set -e

echo "🚀 Configuration de l'environnement de développement Arrhes..."

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    pnpm install
else
    echo "✅ Dépendances déjà installées"
fi

# Build les packages nécessaires (metadata doit être compilé avant tools)
echo "🔨 Compilation des packages..."
pnpm --filter @arrhes/metadata run build

# Créer les fichiers .env s'ils n'existent pas
if [ ! -f "packages/api/.env" ]; then
    echo "⚙️  Création de packages/api/.env..."
    cat > packages/api/.env << 'EOF'
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

# Base de données (Docker Compose)
SQL_DATABASE_URL=postgres://arrhes_user:arrhes_password@postgres:5432/arrhes

# Stockage MinIO (Docker Compose)
STORAGE_ENDPOINT=http://minio:9000
STORAGE_NAME=arrhes-files
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin

# Email MailHog (Docker Compose)
EMAIL_ENDPOINT=mailhog:1025
EMAIL_USER=test
EMAIL_PASSWORD=test
EOF
else
    echo "✅ packages/api/.env existe déjà"
fi

if [ ! -f "packages/tools/.env" ]; then
    echo "⚙️  Création de packages/tools/.env..."
    cat > packages/tools/.env << 'EOF'
DATABASE_URL=postgres://arrhes_user:arrhes_password@postgres:5432/arrhes
EOF
else
    echo "✅ packages/tools/.env existe déjà"
fi

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente du démarrage de PostgreSQL..."
until pg_isready -h postgres -U arrhes_user; do
    sleep 1
done
echo "✅ PostgreSQL est prêt"

# Initialiser la base de données
echo "🗄️  Initialisation de la base de données..."
pnpm --filter tools run push

# Seed avec des données de démonstration
echo "🌱 Insertion des données de démonstration..."
pnpm --filter tools run seed

echo ""
echo "✨ Configuration terminée !"
echo ""
echo "Pour démarrer le développement, lancez :"
echo "  pnpm run dev"
echo ""
echo "Services disponibles :"
echo "  - API : http://localhost:3000"
echo "  - Platform : http://localhost:5173"
echo "  - MinIO Console : http://localhost:9001"
echo "  - MailHog : http://localhost:8025"
echo ""
echo "Identifiants de démonstration :"
echo "  Email : demo@arrhes.com"
echo "  Mot de passe : demo"
echo ""

