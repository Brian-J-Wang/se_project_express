const { Error500 } = require('../utils/error');
const item = require('../models/item');

module.exports.getItems = (req, res) => {
  item.find({})
  .then(items => {
    res.send(items)
  })
  .catch(err => {
    console.log(err);
    Error500(res);
  })
}

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  item.create({
    name: name,
    weather: weather,
    imageUrl: imageUrl,
    owner: req.user._id
  }).then((item) => {
    res.status(200);
    res.send(item);
  })
  .catch(err => {
    console.error(err);
    Error500(res);
  });
}

module.exports.deleteItem = (req, res) => {
  const id = req.params.itemId;
  item.deleteOne({
    _id: id
  }).then((item) => {
    res.status(200);
    res.send(item);
  })
  .catch(err => {
    console.error(err);
    Error500(res);
  })
}