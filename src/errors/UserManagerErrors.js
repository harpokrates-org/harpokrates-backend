const errorCodes = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
}

class UserAlreadyExistsError extends Error {
  constructor() {
    super('The mail is already registered')
    this.code = errorCodes.EMAIL_ALREADY_EXISTS
    this.statusCode = 409
  }
}

module.exports = {
  errorCodes,
  UserAlreadyExistsError,
}
