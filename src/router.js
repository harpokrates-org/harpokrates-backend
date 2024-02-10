const versionRoute = require('./version/route.js')

/*
Registra las rutas en el servidor de Fastify.
*/
module.exports = async function(fastify) {
  fastify.register(versionRoute)
}
