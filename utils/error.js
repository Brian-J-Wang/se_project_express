module.exports.Error500 = (res) => {
  res.status(500);
  res.send({
    message: "An error has occurred on the server"
  });
}

module.exports.Error400 = (res) => {
  res.status(400);
  res.send({
    message: "Invaid data"
  });
}

module.exports.Error401 = (res, message = null) => {
  res.status(401);
  res.send({
    message: message == null ? "Incorrect email or password" : message
  });
}

module.exports.Error403 = (res, message = null) => {
  res.status(403);
  res.send({
    message: message == null ? "Forbidden" : message
  })
}

module.exports.Error404 = (res, message = null) => {
  res.status(404);
  res.send({
    message: message == null ? "Not Found" : message
  });
}

module.exports.Error409 = (res) => {
  res.status(409);
  res.send({
    message: "Email Conflict"
  })
}

