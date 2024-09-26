const schema = require('../schemas/getModels');
const UserManager = require('../model/UserManager');

/*
Declaración de la ruta /models.
Devuelve los modelos creados por el usuario
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/models', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const models = await UserManager.getModels(request.query.email)
    reply
      .type('application/json')
      .code(200)
      .send({ models: models })
  })
  next()
}
