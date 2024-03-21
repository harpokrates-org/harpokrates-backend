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
    await UserManager.login(request.body.email)
    reply
      .type('application/json')
      .code(200)
      .send({})
  })
  next()
}
