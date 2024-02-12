const errorCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND_ERROR'
}

class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.code = errorCodes.USER_NOT_FOUND
    this.statusCode = 404
  }
}

module.exports = {
  errorCodes,
  UserNotFoundError,
}
