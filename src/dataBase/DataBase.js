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

  async addUser(email) {
    const user = new this.userModel({ email });
    const savedUser = await user.save();
    return savedUser;
  }

  async userExists(email) {
    return await this.userModel.exists({ email })
  }

  async deleteUser(email) {
    return await this.userModel.deleteOne({ email })
  }

  close() {
    mongoose.disconnect()
  }
}

module.exports = new DataBase()
