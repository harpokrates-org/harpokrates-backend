FROM node:21-alpine3.18

# Create app directory
WORKDIR /usr/src/app

COPY . .

# Si estamos en render.com entonces
# RENDER=true
# RENDER_REACT_APP_FLICKR_API_KEY='xxxxxx' es la API de Flickr
ARG RENDER
ARG RENDER_REACT_APP_FLICKR_API_KEY

# Variables de entorno para npm run build
ENV NPM_BUILD_ENV=""

# If you are building your code for production
# RUN npm ci --only=production
RUN if [[ -z "$RENDER" ]]; then npm install; else npm ci --only=production; fi;

# Paquetes para desarrollo con vscode
# Solo se instalan localmente, no en render
RUN if [[ -z "$RENDER" ]]; then \
  apk add nano; \
  apk add git; \
  fi; 

CMD ["node", "src/server-js"] 