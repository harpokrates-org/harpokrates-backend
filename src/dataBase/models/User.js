var mongoose = require('mongoose');

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'preferencies'
  }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
