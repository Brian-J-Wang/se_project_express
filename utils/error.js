module.exports.Error500 = (res) => {
  res.status(500);
  res.send("An error has occured on the server");
}