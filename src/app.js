// Dependencies

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const globalErrorHandler = require('./controllers/errorController');
const userRoutes = require('./routes/v1/userRoutes');
const messageRoutes = require('./routes/v1/messageRoutes');
const chatRoutes = require('./routes/v1/chatRoutes');
const deserializeUser = require('./middleware/deserializeUser');
const AppError = require('./utils/appError');

// App y middlewares
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.options('*', cors());

app.use(express.json({ limit: '10kb' }));

app.use(compression());

// Routes

app.get('/api/v1/ping', (req, res) => {
  res.status(200).json({
    status: 'API working corrctly!!!',
  });
});

app.use('/api/v1/users', userRoutes);
app.use(deserializeUser);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/chats', chatRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
