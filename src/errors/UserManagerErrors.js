const errorCodes = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  USER_DOESNT_EXIST: 'USER_DOESNT_EXIST',
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
    this.code = errorCodes.USER_DOESNT_EXIST
    this.statusCode = 401
  }
}

module.exports = {
  errorCodes,
  UserAlreadyExistsError,
  UserDoesNotExistError
}
