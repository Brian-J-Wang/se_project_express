const itemRouter = require('express').Router();
const { getItems, createItem, deleteItem, likeItem, unlikeItem } = require('../controllers/itemController');
const { authorize } = require('../middlewares/auth')

itemRouter.get('/', getItems);

itemRouter.use(authorize);

itemRouter.post('/', createItem);

itemRouter.delete('/:itemId', deleteItem);

itemRouter.put('/:itemId/likes', likeItem);

itemRouter.delete('/:itemId/likes', unlikeItem);
module.exports = itemRouter;