const schema = require('../schemas/getSizes');
const FlickrWrapper = require('../model/FlickrWrapper')

/*
Declaración de la ruta /user.
Devuelve los distintos tamaños asociados a una imagen
ej: Small, medium, large 
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/sizes', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const sizes = await FlickrWrapper.getSizes(request.query.photo_id)
    reply
      .type('application/json')
      .code(200)
      .send({ sizes })
  })
  next()
}
