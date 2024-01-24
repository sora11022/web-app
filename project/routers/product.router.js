const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');
const rolesMiddleware = require('../middlewares/roles.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const typeRole = require('../constants/type.role');

const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategoryId,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

router
  .route('/')
  .post(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.OWNER),
    asyncMiddleware(createProduct),
  )
  .get(asyncMiddleware(getProducts));
router
  .route('/:id')
  .put(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.OWNER),
    asyncMiddleware(updateProduct),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.OWNER),
    asyncMiddleware(deleteProduct),
  )
  .get(asyncMiddleware(getProductById));
router
  .route('/category/:category_Id')
  .get(asyncMiddleware(getProductsByCategoryId));
module.exports = router;
