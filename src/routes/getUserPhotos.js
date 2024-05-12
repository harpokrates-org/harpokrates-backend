const schema = require('../schemas/getUserPhotos');
const { flickrWrapperInstance: FlickrWrapper } = require('../model/FlickrWrapper')

/*
Declaración de la ruta /user/:username/photos.
Dado el nombre de un usuario
Devuelve una lista de imagenes y sus respectivos tamaños.
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/user/:user_id/photos', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const data = await FlickrWrapper.getUserPhotos(
      request.params.user_id, 
      request.query.count,
      request.query.min_date,
      request.query.max_date
    )
    reply
      .type('application/json')
      .code(200)
      .send({photos: data})
  })
  next()
}
