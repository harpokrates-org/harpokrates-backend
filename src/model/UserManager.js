const User = require('./User');
const {
  UserAlreadyExistsError,
  UserDoesNotExistError,
  ModelAlreadyExistsError,
  ModelNotFoundForUser,
} = require('../errors/UserManagerErrors');
const { default: mongoose } = require('mongoose');

class UserManager {
  constructor() {}

  async register(email, name, surname) {
    const user = new User(email, name, surname);
    if (await user.exists()) throw new UserAlreadyExistsError();
    await user.register();
    return user;
  }

  async login(email) {
    const user = new User(email);
    if (!(await user.exists())) throw new UserDoesNotExistError();
    return user.getPreferencies();
  }

  async setPreferencies(email, preferencies) {
    const user = new User(email);
    if (!(await user.exists())) throw new UserDoesNotExistError();
    return user.setPreferencies(preferencies);
  }

  async addModel(email, modelName, modelURL, modelImageSize, modelThreshold) {
    const user = new User(email);
    if (!(await user.exists())) throw new UserDoesNotExistError();
    if (await user.hasModel(modelName)) throw new ModelAlreadyExistsError();
    return user.addModel(modelName, modelURL, modelImageSize, modelThreshold);
  }

  async getModels(email) {
    const user = new User(email);
    if (!(await user.exists())) throw new UserDoesNotExistError();
    return user.getModels();
  }

  async deleteModels(email, modelID) {
    const user = new User(email);
    if (!(await user.exists())) throw new UserDoesNotExistError();
    if (
      (!mongoose.Types.ObjectId.isValid(modelID)) || (!await user.hasModelById(modelID))
    )
      throw new ModelNotFoundForUser();
    return user.deleteModels(modelID);
  }
}

module.exports = new UserManager();
