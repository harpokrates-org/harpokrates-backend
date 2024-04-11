const DataBase = require('../dataBase/DataBase')


class User {
  constructor(email, name, surname){
    this.email = email
    this.name = name
    this.surname = surname
  }

  async register() {
    await DataBase.addUser(this.email, this.name, this.surname)
  }

  async exists() {
    return await DataBase.userExists(this.email)
  }

}

module.exports = User
