const versionRoute = require('./routes/version.js')

/*
Registra las rutas en el servidor de Fastify.
*/
module.exports = async function(fastify) {
  fastify.register(versionRoute)
}
