const { signJwt } = require('../utils/jwt.utils');
const Session = require('../models/sessionModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const login = catchAsync(async (req, res, next) => {
  // //Google verivication
  const payload = req.body;

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create(payload);
  }
  const session = await Session.create({
    user: user._id,
    userAgent: req.get('user-agent') || '',
    userModel: 'User',
  });
  // create token
  const accessToken = signJwt(
    {
      id: user._id,
      email: user.email,
      session: session._id,
    },
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    }
  );

  res.status(200).json({
    status: 'success',
    data: { user, accessToken },
  });
});

const logout = catchAsync(async (req, res) => {
  const sessionId = res.locals.user.session;

  await Session.findOneAndUpdate({ _id: sessionId }, { valid: false });

  return res.send({
    status: 'success',
    accessToken: null,
    refreshToken: null,
  });
});

module.exports = {
  login,
  logout,
};
