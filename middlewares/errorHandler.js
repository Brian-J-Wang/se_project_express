const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message} = err;
  res.statusCode = statusCode;
  res.send({
    message: statusCode === 500
      ? 'An error occured on the server'
      : message
  })
}

module.exports = errorHandler;