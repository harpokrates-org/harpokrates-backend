const schema = require('../schemas/login');
const UserManager = require('../model/UserManager')

/*
Declaración de la ruta /login.
*/
module.exports = function (fastify, opts, next) {
  fastify.post('/login', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const preferencies = await UserManager.login(request.body.email)
    const response = Object.keys(preferencies).length > 0 ? { preferencies } : {}
    reply
      .type('application/json')
      .code(200)
      .send(response)
  })
  next()
}
