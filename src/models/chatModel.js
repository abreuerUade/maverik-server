const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  role: {
    type: String,
    require: true,
    enum: ['user', 'system'],
  },
  content: {
    type: String,
    require: true,
  },
});

const chatSchema = new Schema({
  frontId: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },

  messages: [messageSchema],
});

module.exports = mongoose.model('Chat', chatSchema);
