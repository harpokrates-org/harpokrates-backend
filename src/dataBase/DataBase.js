const { default: mongoose } = require('mongoose');
const userModel = require('./models/User.js');

class DataBase {
    
  constructor(){
    mongoose.connect(process.env.MONGO_URL)
        
    mongoose.connection.on('connected', ()=> {
      let MONGO_URL = ''
      if (process.env.NODE_ENV == 'test') {
        MONGO_URL = process.env.MONGO_URL_TEST
      } else {
        MONGO_URL = process.env.MONGO_URL
      }
      console.info('[Mongoose] - connected in:', MONGO_URL)
    })
        
    mongoose.connection.on('error', (err)=> {
      console.info('[Mongoose] - error:', err)
    })

    this.userModel = userModel;
  }

  async addUser(email, name, surname) {
    const user = new this.userModel({ email, name, surname });
    const savedUser = await user.save();
    return savedUser;
  }

  async userExists(email) {
    return await this.userModel.exists({ email })
  }

  async deleteUser(email) {
    return await this.userModel.deleteOne({ email })
  }

  async setPreferencies(email, model) {
    const user = await this.userModel.findOneAndUpdate({ email },
                                                      { $set: { preferencies: { model } } },
                                                      { new: true })
    return { model: user.preferencies.model }
  }

  async getPreferencies(email) {
    const user = await this.userModel.findOne({ email })
    if (!user.preferencies.model) return {}
    return { model: user.preferencies.model }
  }

  close() {
    mongoose.disconnect()
  }
}

module.exports = new DataBase()
