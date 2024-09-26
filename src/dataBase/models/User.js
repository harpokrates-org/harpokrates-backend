var mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({ 
  name: String, 
  url: String,
  imageSize: Number,
  threshold: Number 
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  preferencies: {
    model:{
      type: String
    }
  },
  models: [modelSchema]
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
