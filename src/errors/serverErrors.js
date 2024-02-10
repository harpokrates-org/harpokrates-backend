class ServerError extends Error {
  constructor(message) {
    super(message)
    this.code = 'SERVER_ERROR'
    this.statusCode = 500
  }
}

module.exports = ServerError
