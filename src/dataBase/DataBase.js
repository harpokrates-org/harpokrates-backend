const { default: mongoose } = require('mongoose');
const userModel = require('./models/User.js');

class DataBase {
    
  constructor(){
    mongoose.connect(process.env.MONGO_URL)
        
    mongoose.connection.on('connected', ()=> {
      console.info('[Mongoose] - connected in:', process.env.MONGO_URL)
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
    return (await this.userModel.findOne({ email })) !== null
  }

  close() {
    mongoose.disconnect()
  }
}

module.exports = new DataBase()
