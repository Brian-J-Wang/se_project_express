const { PORT = 3001 } = process.env;
const express = require('express');

const app = express();

app.listen(PORT, () => {
  console.log('app is active and listening');
})