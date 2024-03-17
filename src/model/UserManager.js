const User = require('./User')


class UserManager {
  constructor(){}

  async register(email) {
    const user = new User(email)
    await user.register()
    return user
  }

}

module.exports = new UserManager()
