const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  createOrUpdateCart,
  getCart,
  deleteAndUpdateItem,
  incrementItem,
} = require('../controllers/cart.controller');

router
  .route('/:userId')
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createOrUpdateCart))
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getCart))
  .put(asyncMiddleware(authMiddleware), asyncMiddleware(deleteAndUpdateItem));
router
  .route('/pl/:userId')
  .put(asyncMiddleware(authMiddleware), asyncMiddleware(incrementItem))
module.exports = router;
