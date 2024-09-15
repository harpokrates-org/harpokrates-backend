const schema = require('../schemas/putPreferencies');
const { flickrWrapperInstance: FlickrWrapper } = require('../model/FlickrWrapper');
const UserManager = require('../model/UserManager');

/*
Declaración de la ruta /preferencies.
Agrega o edita las preferencias de un usuario
*/
module.exports = function (fastify, opts, next) {
  fastify.put('/preferencies', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const preferencies = await UserManager.setPreferencies(request.body.email, request.body.preferencies)
    reply
      .type('application/json')
      .code(201)
      .send({ preferencies })
  })
  next()
}
