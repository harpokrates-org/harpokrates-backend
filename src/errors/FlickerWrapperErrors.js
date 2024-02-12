class UserNotFoundError extends Error {
  constructor() {
    super('User not found')
    this.code = 'USER_NOT_FOUND_ERROR'
    this.statusCode = 404
  }
}

module.exports = UserNotFoundError
