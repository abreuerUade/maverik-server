const catchAsync = require('../utils/catchAsync');
const Chat = require('../models/chatModel');
const axios = require('axios');

const sendMessage = catchAsync(async (req, res) => {
  const message = {
    role: 'user',
    content: req.body.message,
  };
  const frontId = req.body.frontId;

  let chat = await Chat.findOne({ user: res.locals.user.id, frontId });

  if (!chat) {
    chat = await Chat.create({
      user: res.locals.user.id,
      frontId,
      messages: [],
    });
  }

  const llama = await axios('http://localhost:11434/api/generate', {
    method: 'POST',
    data: {
      model: 'gemma2',
      prompt: message.content,
      stream: false,
    },
  });
  const llamaRta = {
    role: 'system',
    content: llama.data.response,
  };

  chat.messages.push(message, llamaRta);

  await Chat.findOneAndUpdate({ user: res.locals.user.id, frontId }, chat);

  res.status(200).json({
    status: 'success',
    data: {
      llamaRta,
    },
  });
});

module.exports = { sendMessage };
