const { getItems, createItem, deleteItem } = require('../controllers/itemController');

const itemRoutes = require('express').Router();

itemRoutes.get('/', getItems);

itemRoutes.post('/', createItem);

itemRoutes.delete('/:itemId', deleteItem);