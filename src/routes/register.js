const schema = require('../schemas/register');
const UserManager = require('../model/UserManager')

/*
Declaración de la ruta /register.
Registra un usuario con su mail
*/
module.exports = function (fastify, opts, next) {
  fastify.post('/register', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const user = await UserManager.register(request.body.email)
    reply
      .type('application/json')
      .code(201)
      .send({ email: user.email })
  })
  next()
}
