const ServerError = require('../errors/serverErrors');

/*
Maneja los errores de Fastify, devolviendo una
respuesta con el código de error y un mensaje
*/
module.exports = function (error, request, reply) {
  if (!error.code) error = new ServerError(error.message)
  reply
    .type('application/json')
    .code(error.statusCode)
    .send({
      code: error.code,
      message: error.message
    })
}
