const { version } = require('../../package.json');

/*
Declaración de la ruta /version.
Devuelve la version de la aplicación.
*/
module.exports = async function (fastify, opts, next) {
  fastify.get('/version', async (request, reply) => {
    reply
        .type('application/json')
        .code(200)
        .send({version: version})
  })
  next()
}
