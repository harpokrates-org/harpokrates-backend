const errorCodes = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  EMAIL_DOES_NOT_EXIST: 'EMAIL_DOES_NOT_EXIST',
}

class UserAlreadyExistsError extends Error {
  constructor() {
    super('The mail is already registered')
    this.code = errorCodes.EMAIL_ALREADY_EXISTS
    this.statusCode = 409
  }
}

class UserDoesNotExistError extends Error {
  constructor() {
    super('The mail is not registed')
    this.code = errorCodes.EMAIL_DOES_NOT_EXIST
    this.statusCode = 401
  }
}

module.exports = {
  errorCodes,
  UserAlreadyExistsError,
  UserDoesNotExistError
}
