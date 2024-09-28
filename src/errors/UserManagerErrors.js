const errorCodes = {
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  USER_DOESNT_EXIST: 'USER_DOESNT_EXIST',
  MODEL_ALREADY_EXISTS: 'MODEL_ALREADY_EXISTS',
  MODEL_NOT_FOUND_FOR_USER: 'MODEL_NOT_FOUND_FOR_USER'
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

class ModelAlreadyExistsError extends Error {
  constructor() {
    super('The user already has the model registered')
    this.code = errorCodes.MODEL_ALREADY_EXISTS
    this.statusCode = 409
  }
}

class ModelNotFoundForUser extends Error {
  constructor() {
    super('Model not found for user')
    this.code = errorCodes.MODEL_NOT_FOUND_FOR_USER
    this.statusCode = 404
  }
}

module.exports = {
  errorCodes,
  UserAlreadyExistsError,
  UserDoesNotExistError,
  ModelAlreadyExistsError,
  ModelNotFoundForUser
}
