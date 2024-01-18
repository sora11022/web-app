const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');

const { login, register } = require('../controllers/auth.controller');

router.route('/login').post(asyncMiddleware(login));
router.route('/register').post(asyncMiddleware(register));

module.exports = router;
