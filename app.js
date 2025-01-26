const { PORT = 3001 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const index = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./utils/errors/notFoundError');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
const app = express();
app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use('/', index);

app.use('/users', userRouter);

app.use('/items', itemRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Route Not Found'));
})

app.use(errorLogger);

app.use(errors())

app.use(errorHandler);

app.listen(PORT, () => {})