const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Chat = require('../models/chatModel');

const getChats = catchAsync(async (req, res) => {
  const chats = await Chat.find({ user: res.locals.user.id });

  res.status(200).json({
    status: 'success',
    data: {
      chats,
    },
  });
});

const getChatById = catchAsync(async (req, res) => {
  const chat = await Chat.findOne({
    user: res.locals.user.id,
    frontId: req.params.frontId,
  });

  res.status(200).json({
    status: 'success',
    data: {
      chat,
    },
  });
});

const deleteChat = catchAsync(async (req, res) => {
  await Chat.findOneAndDelete({
    user: res.locals.user.id,
    frontId: req.params.frontId,
  });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = { getChats, getChatById, deleteChat };
