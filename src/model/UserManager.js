const DataBase = require('../dataBase/DataBase')


class UserManager {
  constructor(){}

  async register(email) {
    const user = DataBase.addUser(email)
    return user
  }

}

module.exports = new UserManager()
