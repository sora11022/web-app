const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const { login, register, logout } = require('../controllers/auth.controller');

router.route('/login').post(asyncMiddleware(login));
router.route('/register').post(asyncMiddleware(register));
router
  .route('/')
  .post(asyncMiddleware(authMiddleware), asyncMiddleware(logout));

module.exports = router;
