const User = require('./User')
const { UserAlreadyExistsError, UserDoesNotExistError } = require('../errors/UserManagerErrors')


class UserManager {
  constructor(){}

  async register(email) {
    const user = new User(email)
    if (await user.exists()) throw new UserAlreadyExistsError
    await user.register()
    return user
  }

  async login(email) {
    const user = new User(email)
    if (! await user.exists()) throw new UserDoesNotExistError
    return user
  }
}

module.exports = new UserManager()
