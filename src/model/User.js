const DataBase = require('../dataBase/DataBase')


class User {
  constructor(email){
    this.email = email
  }

  async register() {
    await DataBase.addUser(this.email)
  }

  async exists() {
    return await DataBase.userExists(this.email)
  }

}

module.exports = User
