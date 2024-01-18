require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorResponse(401, 'Invalid Token');
  }
  const token = authorization.split(' ')[1];
  const decode = jwt.verify(token, process.env.SECRET_KEY);

  const user = await userModel.findById(decode._id);

  if (!user) {
    throw new ErrorResponse(401, 'Account does not existed');
  }
  req.user = user;
  next()
};
