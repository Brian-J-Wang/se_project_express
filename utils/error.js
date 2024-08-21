module.exports.Error500 = (res,err) => {
  res.status(500);
  res.send({
    message: "An error has occurred on the server"
  });
}

module.exports.Error400 = (res, err) => {
  res.status(400);
  res.send({
    message: "Invaid data"
  });
}

module.exports.Error404 = (res, err) => {
  res.status(404);
  res.send({
    message: "Resource not found"
  });
}