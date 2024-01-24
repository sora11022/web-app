const orderModel = require('../models/orders.model');
const cartModel = require('../models/carts.model');

module.exports = {
  createOrder: async (req, res) => {
    const body = req.body;
    await cartModel.findByIdAndUpdate(body.cartId, { isOrdered: true });
    const order = await orderModel.create(body);
    return res.status(201).json(order);
  },
  getOrderFromUserId: async (req, res) => {
    const userId = req.body.userId;
    const status = req.query.status;

    const userOrder = await orderModel.find({userId: userId});
  },
};
