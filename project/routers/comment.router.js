const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  createComment,
  getCommentsFromProduct,
  deleteComment,
} = require('../controllers/comment.controller');

router
  .route('/:productId')
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(createComment))
  .get(asyncMiddleware(getCommentsFromProduct));
router
  .route('/')
  .delete(asyncMiddleware(authMiddleware), asyncMiddleware(deleteComment));
module.exports = router;
