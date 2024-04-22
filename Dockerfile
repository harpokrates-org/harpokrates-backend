FROM node:21-alpine3.18

# Create app directory
WORKDIR /usr/src/app

COPY . .

# Si estamos en render.com entonces
# RENDER=true
# RENDER_REACT_APP_FLICKR_API_KEY='xxxxxx' es la API de Flickr
ARG RENDER
ARG RENDER_FLICKR_API_KEY

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Variables de entorno
ENV ENVVARS=""

# Paquetes para desarrollo con vscode
# Solo se instalan localmente, no en render
RUN if [[ -z "$RENDER" ]]; then \
    apk add nano; \
    apk add git; \
  else \ 
    # Si estamos en render.com, seteamos la env variables en un string \
    ENVVARS="FLICKR_API_KEY=${RENDER_FLICKR_API_KEY}"; \ 
  fi; 

ENV NODE_ENV "production"
CMD $ENVVARS node src/server.js 