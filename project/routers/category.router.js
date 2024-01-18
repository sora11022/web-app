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
  createCategory,
  getCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require('../controllers/category.controller');

const upload = multer({
  storage: storage,
});

router
  .route('/')
  .post(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.ADMIN),
    upload.single('img'),
    asyncMiddleware(createCategory),
  )
  .get(asyncMiddleware(getCategory));

router
  .route('/:id')
  .patch(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.ADMIN),
    upload.single('img'),
    asyncMiddleware(updateCategory),
  )
  .delete(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteCategory),
  )
  .get(asyncMiddleware(getCategoryById));

module.exports = router;
