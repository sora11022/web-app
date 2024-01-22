const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  createOrUpdateCart,
  getCart,
  deleteAndUpdateItem,
  incrementItem,
  removeItem,
} = require('../controllers/cart.controller');

router
  .route('/:userId')
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createOrUpdateCart))
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getCart))
  .put(asyncMiddleware(authMiddleware), asyncMiddleware(deleteAndUpdateItem));
router
  .route('/adj/:userId')
  .put(asyncMiddleware(authMiddleware), asyncMiddleware(incrementItem))
  .put(asyncMiddleware(authMiddleware),asyncMiddleware(removeItem));
module.exports = router;
