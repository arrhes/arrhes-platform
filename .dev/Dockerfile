ARG NODE_VERSION="latest"
ARG PNPM_VERSION="latest"

FROM node:${NODE_VERSION}-bullseye-slim

# Minimal runtime + tools
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists (no default packages installed here)
RUN apt-get update

# Install pnpm using the PNPM_VERSION build arg
RUN npm install -g "pnpm@${PNPM_VERSION}"

# Reduce image size
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

# Create workspace directory and set permissions
WORKDIR /workspace
RUN mkdir -p /workspace \
  && chown -R node:node /workspace

# Use non-root node user by default
USER node

# Note: dependencies are installed during the bootstrap step (post-create)
# The workspace is mounted from the host at runtime.
