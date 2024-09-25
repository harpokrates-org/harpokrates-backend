const Fastify = require('fastify')
const versionRoute = require('./routes/version.js')
const registerRoute = require('./routes/register.js')
const loginRoute = require('./routes/login.js')
const getUserRoute = require('./routes/getUser.js')
const getUserProfileRoute = require('./routes/getUserProfile.js')
const getPhotosRoute = require('./routes/getPhotos.js')
const getFavoritesRoute = require('./routes/getFavorites.js')
const errorHandler = require('./utils/errorHandler.js');
const { setLogRequestHook, setLogReplyHook } = require('./utils/logger.js');
const getUserPhotos = require('./routes/getUserPhotos.js')
const putPreferencies = require('./routes/putPreferencies.js')
const putModels = require('./routes/postModels.js')

class FastifyWrapper {
  constructor() {
    this.app = Fastify({
      logger: true
    })
    setLogRequestHook(this.app)
    setLogReplyHook(this.app)
    this.app.setErrorHandler(errorHandler)
    this._addRoutes()
  }

  /*
  Ejecuta el servidor de Fastify.
  */
  start(port, host) {
    return this.app.listen({
      port,
      host
    })
  }

  close() {
    this.app.close() 
  }

  async inject(method, url, body) {
    return await this.app.inject({
      method,
      url,
      body
    })
  }

  /*
  Registra las rutas en el servidor de Fastify.
  */
  _addRoutes() {
    this.app.register(require('@fastify/cors'), { origin: true });
    this.app.register(versionRoute)
    this.app.register(registerRoute)
    this.app.register(getUserRoute)
    this.app.register(getUserProfileRoute)
    this.app.register(getPhotosRoute)
    this.app.register(getFavoritesRoute)
    this.app.register(getUserPhotos)
    this.app.register(loginRoute)
    this.app.register(putPreferencies)
    this.app.register(putModels)
  }
}

module.exports = FastifyWrapper
