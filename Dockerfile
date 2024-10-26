FROM node:21-alpine3.18

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

# If you are building your code for production
RUN npm --loglevel verbose install

COPY . .

# Paquetes para desarrollo con vscode
# Solo se instalan localmente, no en render
RUN if [[ -z "$RENDER" ]]; then \
    apk add nano; \
    apk add git; \
  fi; 

ENV NODE_ENV "production"
CMD node src/server.js  