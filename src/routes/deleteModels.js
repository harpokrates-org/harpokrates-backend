const schema = require('../schemas/deleteModels');
const UserManager = require('../model/UserManager');

/*
Declaración de la ruta /models.
Elimina un model del usuario
*/
module.exports = function (fastify, opts, next) {
  fastify.delete('/models', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const models = await UserManager.deleteModels(request.query.email, request.query.modelID)
    reply
      .type('application/json')
      .code(200)
      .send({ models: models })
  })
  next()
}
