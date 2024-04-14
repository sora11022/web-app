const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const rolesMiddleware = require('../middlewares/roles.middleware');
const typeRole = require('../constants/type.role');

const {
  createOrder,
  getOrderFromUserId,
  getOrders,
  updateOrderStatus,
} = require('../controllers/order.controller');

router
  .route('/')
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createOrder))
  .get(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.ADMIN),
    asyncMiddleware(getOrders),
  )
  .patch(asyncMiddleware(authMiddleware), asyncMiddleware(updateOrderStatus));
router
  .route('/:userId')
  .get(asyncMiddleware(authMiddleware), asyncMiddleware(getOrderFromUserId));

module.exports = router;
