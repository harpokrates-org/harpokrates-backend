const { version } = require('../../package.json');
const VersionNotFoundError = require('../errors/versionErrors');

/*
Declaración de la ruta /version.
Devuelve la version de la aplicación.
*/
module.exports = async function (fastify, opts, next) {
  fastify.get('/version', async (request, reply) => {
    if (!version) throw new VersionNotFoundError()
    reply
      .type('application/json')
      .code(200)
      .send({version: version})
  })
  next()
}
