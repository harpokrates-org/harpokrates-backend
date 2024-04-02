FROM node:21.7.1-alpine3.19

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN apk update && apk upgrade

# If you are building your code for production
# RUN npm ci --only=production
RUN npm ci --only=production --verbose

CMD node src/server.js 