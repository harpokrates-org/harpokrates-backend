const schema = require('../schemas/putModels');
const UserManager = require('../model/UserManager');

/*
Declaración de la ruta /models.
Agrega o edita las modelos subidos por el usuario
*/
module.exports = function (fastify, opts, next) {
  fastify.put('/models', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const models = await UserManager.setModels(request.body.email, request.body.models)
    reply
      .type('application/json')
      .code(201)
      .send({ models })
  })
  next()
}
