const errorCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND_ERROR',
  UNKNOWN_USER: 'UNKNOWN_USER'
}

class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.code = errorCodes.USER_NOT_FOUND
    this.statusCode = 404
  }
}

class UnknownUserError extends Error {
  constructor() {
    super('Unknown user')
    this.code = errorCodes.UNKNOWN_USER
    this.statusCode = 404
  }
}

module.exports = {
  errorCodes,
  UserNotFoundError,
  UnknownUserError
}
