const Fastify = require('fastify')
const versionRoute = require('./routes/version.js')
const getUserRoute = require('./routes/getUser.js')
const errorHandler = require('./utils/errorHandler.js');
const { setLogRequestHook, setLogReplyHook } = require('./utils/logger.js');

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

  async inject(method, url) {
    return await this.app.inject({
      method,
      url
    })
  }

  /*
  Registra las rutas en el servidor de Fastify.
  */
  _addRoutes() {
    this.app.register(require('@fastify/cors'), { origin: true });
    this.app.register(versionRoute)
    this.app.register(getUserRoute)
  }
}

module.exports = FastifyWrapper
