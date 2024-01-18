const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const rolesMiddleware = require('../middlewares/roles.middleware');
const typeRole = require('../constants/type.role');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const {
  createProductImage,
  getProductImage,
  deleteProductImage,
} = require('../controllers/productImages.controller');

const upload = multer({
  storage: storage,
});

router
  .route('/')
  .post(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.OWNER),
    upload.fields([{ name: 'productImg', maxCount: 4 }]),
    asyncMiddleware(createProductImage),
  );
router.route('/:productId').get(asyncMiddleware(getProductImage));
router
  .route('/:productImgId')
  .delete(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.OWNER),
    asyncMiddleware(deleteProductImage),
  );
module.exports = router;
