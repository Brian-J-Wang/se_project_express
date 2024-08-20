const { PORT = 3001 } = process.env;
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');

const db = mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
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

app.listen(PORT, () => {
  console.log(`app is active and listening on port ${PORT}`);
})