const orderModel = require('../models/orders.model');
const cartModel = require('../models/carts.model');

module.exports = {
  createOrder: async (req, res) => {
    const userId = req.body.userId;
    const body = req.body;
    const order = await orderModel.create(body);
    await cartModel.findByIdAndUpdate(body.cart_id, { isOrdered: true });
  },
};
