const schema = require('../schemas/getUserPhotos');
const FlickrWrapper = require('../model/FlickrWrapper')

/*
Declaración de la ruta /user/:username/photos.
Dado el nombre de un usuario
Devuelve una lista de imagenes y sus respectivos tamaños.
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/user/:username/photos', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const data = await FlickrWrapper.getUserPhotos(
      request.params.username, 
      request.query.count
    )
    reply
      .type('application/json')
      .code(200)
      .send({photos: data})
  })
  next()
}
