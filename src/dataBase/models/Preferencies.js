var mongoose = require('mongoose');

const preferenciesSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  }
});

const preferenciesModel = mongoose.model('preferencies', preferenciesSchema);
module.exports = preferenciesModel;
