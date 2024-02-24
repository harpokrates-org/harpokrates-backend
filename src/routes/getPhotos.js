const schema = require('../schemas/getPhotos');
const FlickrWrapper = require('../model/FlickrWrapper')

/*
Declaración de la ruta /user.
Devuelve...
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/photos', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const photos = await FlickrWrapper.getPhotos(request.query.user_id, request.query.per_page)
    reply
      .type('application/json')
      .code(200)
      .send({ photos })
  })
  next()
}
