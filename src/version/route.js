const { version } = require('../../package.json');
const VersionNotFoundError = require('../errors/versionErrors');
const ServerError = require('../errors/serverErrors');

/*
Declaración de la ruta /version.
Devuelve la version de la aplicación.
*/
module.exports = async function (fastify, opts, next) {
  fastify.get('/version',
  async (request, reply) => {
    try{
      if (!version) throw new VersionNotFoundError()
      reply
          .type('application/json')
          .code(200)
          .send({version: version})
    } catch(error) {
      if (!error.code) error = new ServerError(error.message)
      reply
          .type('application/json')
          .code(error.statusCode)
          .send({
            code: error.code,
            message: error.message
          })
    }
  })
  next()
}
