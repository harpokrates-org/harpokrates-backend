const ServerError = require('../errors/serverErrors');

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
