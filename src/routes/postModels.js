const schema = require('../schemas/postModels');
const UserManager = require('../model/UserManager');

/*
Declaración de la ruta /models.
Agrega o edita las modelos subidos por el usuario
*/
module.exports = function (fastify, opts, next) {
  fastify.post('/models', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const models = await UserManager.addModel(request.body.email, request.body.modelName, request.body.modelURL)
    reply
      .type('application/json')
      .code(201)
      .send({ models: models })
  })
  next()
}
