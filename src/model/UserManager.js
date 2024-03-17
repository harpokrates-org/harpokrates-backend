const User = require('./User')
const { UserAlreadyExistsError } = require('../errors/UserManagerErrors')


class UserManager {
  constructor(){}

  async register(email) {
    const user = new User(email)
    if (await user.exists()) throw new UserAlreadyExistsError
    await user.register()
    return user
  }

}

module.exports = new UserManager()
