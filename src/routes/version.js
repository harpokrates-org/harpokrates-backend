const { version } = require('../../package.json');
const VersionNotFoundError = require('../errors/versionErrors');
const schema = require('../schemas/version');

/*
Declaración de la ruta /version.
Devuelve la version de la aplicación.
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/version', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, function (request, reply) {
    if (!version) throw new VersionNotFoundError()
    reply
      .type('application/json')
      .code(200)
      .send({version: version})
  })
  next()
}
