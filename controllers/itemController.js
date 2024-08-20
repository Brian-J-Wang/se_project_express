const { Error500, Error400, Error404 } = require('../utils/error');
const item = require('../models/item');

module.exports.getItems = (req, res) => {
  item.find({})
  .then(items => {
    res.send(items)
  })
  .catch(err => {
    Error500(res, err);
  })
}

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  item.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id
  }).then((itemData) => {
    res.status(200);
    res.send(itemData);
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      Error400(res, err);
    } else {
      Error500(res, err);
    }
  });
}

module.exports.deleteItem = (req, res) => {
  const id = req.params.itemId;
  item.deleteOne({
    _id: id
  }).orFail(() => {
    const error = Error("Item does not exist");
    error.name = "MissingItem";
    throw error;
  })
  .then((itemData) => {
    res.status(200);
    res.send(itemData);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      Error400(res, err);
    } else if (err.name === 'MissingItem') {
      Error404(res, err);
    } else {
      Error500(res, err);
    }
  })
}

module.exports.likeItem = (req, res) => {
  item.findByIdAndUpdate(req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true })
  .orFail(() => {
    const error = Error("InvalidId");
    error.name = "InvalidId";
    throw error;
  })
  .then((itemData) => {
    res.status(200);
    res.send(itemData);
  })
  .catch(err => {
    if (err.name === "CastError") {
      Error400(res, err);
    } else if (err.name === "InvalidId") {
      Error404(res, err);
    } else {
      Error500(res, err);
    }
  })
}

module.exports.unlikeItem = (req, res) => {
  item.findByIdAndUpdate(req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  ).orFail(() => {
    const error = Error("Requested resource not found");
    error.name = "MissingResource";
    throw error;
  })
  .then((itemData) => {
    res.status(200);
    res.send(itemData);
  })
  .catch(err => {
    if (err.name === "CastError") {
      Error400(res, err);
    } else if (err.name === "MissingResource") {
      Error404(res, err);
    } else {
      Error500(res, err);
    }
  })
}