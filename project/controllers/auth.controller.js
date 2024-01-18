require('dotenv').config();
const userModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountValid = require('../validations/account.valid');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({
      username: username,
    });
    if (!user) {
      throw new ErrorResponse(400, 'Wrong username or password');
    }
    //check password
    let checkPassword = bcryptjs.compareSync(password, user.password);
    if (!checkPassword) {
      throw new ErrorResponse(400, 'Wrong username or password');
    }
    const payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '15m',
    });
    return res.status(200).json({
      ...payload,
      token: token,
    });
  },

  register: async (req, res) => {
    const { username, password, fullname, email, phone, address } = req.body;
    const { error, value } = accountValid({
      username,
      password,
      fullname,
      email,
      phone,
      address,
    });
    if (error) {
      throw new ErrorResponse(400, error.message);
    }
    //check mail trong db
    const userEmail = await userModel.findOne({
      email: email,
    });
    if (userEmail) {
      throw new ErrorResponse(400, 'Email existed');
    }

    //check phone trong db
    const userPhone = await userModel.findOne({
      phone: phone,
    });
    if (userPhone) {
      throw new ErrorResponse(400, 'Phone existed');
    }

    const newUser = await userModel.create(value);
    return res.status(201).json(newUser);
  },
};
