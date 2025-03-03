const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  subId: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('User', userSchema);
