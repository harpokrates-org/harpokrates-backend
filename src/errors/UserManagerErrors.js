
class UserAlreadyExistsError extends Error {
  constructor() {
    super('The mail is already registered')
    this.code = 'EMAIL_ALREADY_EXISTS'
    this.statusCode = 409
  }
}

module.exports = {
  UserAlreadyExistsError,
}
