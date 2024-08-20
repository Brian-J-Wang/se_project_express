const { getItems, createItem, deleteItem } = require('../controllers/itemController');

const itemRouter = require('express').Router();

itemRouter.get('/', getItems);

itemRouter.post('/', createItem);

itemRouter.delete('/:itemId', deleteItem);

module.exports = itemRouter;