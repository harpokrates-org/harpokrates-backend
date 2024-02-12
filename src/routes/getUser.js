const schema = require('../schemas/getUser');
const FlickrWrapper = require('../model/FlickrWrapper')

/*
Declaración de la ruta /user.
Devuelve...
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/user', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const id = await FlickrWrapper.getUser(request.query.username)
    reply
      .type('application/json')
      .code(200)
      .send({ id })
  })
  next()
}
