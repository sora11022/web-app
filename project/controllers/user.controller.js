const ErrorResponse = require('../helpers/ErrorResponse');
const userModel = require('../models/user.model');
const accountValid = require('../validations/account.valid');

module.exports = {
  getUser: async (req, res) => {
    const perPage = 10;
    let page = req.query.page || 1;

    const userList = await userModel
      .find()
      .sort('-createAt')
      .skip(perPage * page - perPage)
      .limit(perPage);

    const count = await userModel.countDocuments();
    return res.status(200).json({
      current: +page,
      total: Math.ceil(count / perPage),
      count: count,
      data: userList,
    });
  },
  getUserById: async (req, res) => {
    const userId = req.params.id;
    const userInfo = await userModel.findById(userId);
    return res.status(200).json(userInfo);
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    await userModel.findByIdAndDelete(userId);
    return res.status(204).json();
  },
  updateUserInfo: async (req, res) => {
    const userId = req.params.id;
    const body = req.body;
    const { error, value } = accountValid(body);

    if (error) {
      throw new ErrorResponse(400, error.message);
    }
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      throw new ErrorResponse(404, 'user does not exist');
    }

    const userEmail = await userModel.findOne({
      email: body.email,
    });
    if (userEmail && existingUser.email !== body.email) {
      throw new ErrorResponse(400, 'Email existed');
    }
    const userPhone = await userModel.findOne({
      phone: body.phone,
    });
    if (userPhone && existingUser.phone !== body.phone) {
      throw new ErrorResponse(400, 'Phone existed');
    }
    const updatedUser = await userModel.findByIdAndUpdate(userId, value, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  },
};
