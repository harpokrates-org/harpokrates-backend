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

  async setPreferencies(preferencies) {
    return await DataBase.setPreferencies(this.email, preferencies.model)
  }

  async getPreferencies() {
    return await DataBase.getPreferencies(this.email)
  }

  async hasModel(modelName) {
    return await DataBase.userHasModel(this.email, modelName)
  }

  async addModel(modelName, modelURL) {
    return await DataBase.addModel(this.email, modelName, modelURL)
  }

  async getModels() {
    return await DataBase.getModels(this.email)
  }
}

module.exports = User
