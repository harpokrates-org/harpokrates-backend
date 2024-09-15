const User = require('./User')
const { UserAlreadyExistsError, UserDoesNotExistError } = require('../errors/UserManagerErrors')


class UserManager {
  constructor(){}

  async register(email, name, surname) {
    const user = new User(email, name, surname)
    if (await user.exists()) throw new UserAlreadyExistsError
    await user.register()
    return user
  }

  async login(email) {
    const user = new User(email)
    if (! await user.exists()) throw new UserDoesNotExistError
    return user
  }

  async setPreferencies(email, preferencies) {
    const user = new User(email)
    if (! await user.exists()) throw new UserDoesNotExistError
    return user.setPreferencies(preferencies)
  }
}

module.exports = new UserManager()
