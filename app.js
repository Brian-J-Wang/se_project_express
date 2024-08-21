const { PORT = 3001 } = process.env;
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const { Error404 } = require('./utils/error');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '66c3ed67dbcc932f7986038b'
  };
  next();
})

app.use('/users', userRouter);

app.use('/items', itemRouter);

app.use((req, res) => {
  Error404(res);
})

app.listen(PORT, () => {})