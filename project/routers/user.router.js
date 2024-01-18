const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const rolesMiddleware = require('../middlewares/roles.middleware');
const typeRole = require('../constants/type.role');

const {
  getUser,
  getUserById,
  deleteUser,
  updateUserInfo,
} = require('../controllers/user.controller');

router
  .route('/')
  .get(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.ADMIN),
    asyncMiddleware(getUser),
  );
router
  .route('/:id')
  .delete(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.ADMIN),
    asyncMiddleware(deleteUser),
  )
  .put(
    asyncMiddleware(authMiddleware),
    rolesMiddleware(typeRole.ADMIN),
    asyncMiddleware(updateUserInfo),
  )
  .get(asyncMiddleware(getUserById));

module.exports = router;
