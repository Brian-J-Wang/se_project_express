const { PORT = 3001 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const { login, createUser } = require('./controllers/userController');

const itemRouter = require('./routes/itemRoutes');
const { Error404 } = require('./utils/error');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
const app = express();

app.use(cors);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '...'
  };

  next();
})

app.use('/users', userRouter);

app.post('/signin', login);

app.post('/signup', createUser);

app.use('/items', itemRouter);

app.use((req, res) => {
  Error404(res);
})

app.listen(PORT, () => {})