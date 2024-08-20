const { getItems, createItem, deleteItem, likeItem, unlikeItem } = require('../controllers/itemController');

const itemRouter = require('express').Router();

itemRouter.get('/', getItems);

itemRouter.post('/', createItem);

itemRouter.delete('/:itemId', deleteItem);

itemRouter.put('/:itemId/likes', likeItem);

itemRouter.delete('/:itemId/likes', unlikeItem);
module.exports = itemRouter;