const schema = require('../schemas/getUserProfile');
const { flickrWrapperInstance: FlickrWrapper } = require('../model/FlickrWrapper')

/*
Declaración de la ruta /user/profile.
Devuelve el información sobre el perfil de un usuario de flickr a partir de su id de usuario
*/
module.exports = function (fastify, opts, next) {
  fastify.get('/user/profile', {
    preHandler: [fastify.logRequest],
    onSend: [fastify.logReply],
    schema,
  }, async function (request, reply) {
    const profile = await FlickrWrapper.getUserProfile(request.query.user_id)
    reply
      .type('application/json')
      .code(200)
      .send(profile)
  })
  next()
}
