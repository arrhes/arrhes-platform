ARG NODE_VERSION=24
FROM mcr.microsoft.com/devcontainers/typescript-node:${NODE_VERSION}

# Installer pnpm globalement
RUN npm install -g pnpm

# Installer des outils utiles
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    postgresql-client \
    curl \
    vim \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Configurer le workspace
WORKDIR /workspace

# Note: Les dépendances seront installées via postCreateCommand
# car le workspace sera monté depuis le host

