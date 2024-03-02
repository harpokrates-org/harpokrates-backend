const schema = require('../schemas/getFavorites');
const FlickrWrapper = require('../model/FlickrWrapper')

/*
Declaración de la ruta /favorites.
Devuelve los nodos y aristas de un grafo que representa los favoritos dados a las fotos.
Inicia analizando las fotos photo_ids, y luego la última foto subida por los usuarios
que dieron favorito a dichas fotos, recursivamente.
La profundidad máxima de búsqueda es 2.
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/favorites', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const photoIDs = JSON.parse(request.query.photo_ids)
    const favorited = await FlickrWrapper.getUsersWhoHaveFavorited(request.query.username, photoIDs)
    reply
      .type('application/json')
      .code(200)
      .send(favorited)
  })
  next()
}
