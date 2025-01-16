const { Error500, Error400, Error404, Error403 } = require('../utils/error');
const item = require('../models/item');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/notFoundError');

module.exports.getItems = (req, res) => {
  item.find({})
  .then(items => {
    res.send(items)
  })
  .catch(err => {
    next(err);
  })
}

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  item.create({
    name,
    weather,
    imageUrl,
    owner: req.user
  }).then((itemData) => {
    res.status(200);
    res.send(itemData);
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid Data'));
    } else {
      next(err);
    }
  });
}

module.exports.deleteItem = (req, res, next) => {
  const id = req.params.itemId;

  item.findById(id)
  .orFail(() => {
    const error = Error("Item does not exist");
    error.name = "MissingItem";
    throw error;
  })
  .then(itemData => {
    if (itemData.owner.toString() === req.user._id) {
      return itemData.deleteOne({ _id: id});
    }
      const error = Error("User does not own this item");
      error.name = "OwnerMismatch";
      return Promise.reject(error);

  })
  .then((itemData) => {
    res.status(200);
    res.send(itemData);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid Data'));
    } else if (err.name === 'MissingItem') {
      next(new NotFoundError(err.message));
    } else if (err.name === 'OwnerMismatch') {
      next(new ForbiddenError(err.message));
    } else {
      next(err);
    }
  })
}

module.exports.likeItem = (req, res, next) => {
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

    } else if (err.name === "InvalidId") {
      next(new NotFoundError());
    } else {
      next(err);
    }
  })
}

module.exports.unlikeItem = (req, res, next) => {
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
      next(new BadRequestError());
    } else if (err.name === "MissingResource") {
      next(new NotFoundError());
    } else {
      Error500(res);
    }
  })
}