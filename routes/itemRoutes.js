const itemRouter = require('express').Router();
const { getItems, createItem, deleteItem, likeItem, unlikeItem } = require('../controllers/itemController');
const { authorize } = require('../middlewares/auth');
const { validateClothing, validateId } = require('../middlewares/validation');

itemRouter.get('/', getItems);

itemRouter.use(authorize);

itemRouter.post('/', validateClothing, createItem);

itemRouter.delete('/:itemId', validateId, deleteItem);

itemRouter.put('/:itemId/likes', validateId, likeItem);

itemRouter.delete('/:itemId/likes', validateId, unlikeItem);
module.exports = itemRouter;