ARG NODE_VERSION="latest"
ARG PNPM_VERSION="latest"

FROM node:${NODE_VERSION}-bullseye-slim AS node
# Minimal runtime + tools
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists (no default packages installed here)
RUN apt-get update

# Install pnpm using the PNPM_VERSION build arg
RUN npm install -g "pnpm@${PNPM_VERSION}"

# Reduce image size
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

# Copy the files and install dependencies
WORKDIR /workspace
COPY .dev ./.dev
COPY package.json pnpm-workspace.yaml ./
COPY packages/metadata ./packages/metadata
COPY packages/tools ./packages/tools
COPY packages/api ./packages/api

# Install all dependencies
RUN ls -la ./
RUN pnpm install
# RUN ls -la node_modules/.pnpm


# Build the api
RUN pnpm --filter="@retrievall/platform-metadata" run build
RUN pnpm --filter="@retrievall/platform-api" run build

USER node

# RUN chmod +x ./.dev/packages/api/entrypoint.sh
RUN ./.dev/packages/api/entrypoint.sh

CMD "pnpm", "--filter=@arrhes/@arrhes/platform-api", "dev"
