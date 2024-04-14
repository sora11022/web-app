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
    const userId = req.params.userId;

    const carts = await cartModel.find({ userId, isOrdered: true });
    const orders = await Promise.all(
      carts.map(async (cart) => {
        const order = await orderModel
          .findOne({
            cartId: cart._id,
          })
          .populate({
            path: 'cartId',
            populate: [
              {
                path: 'userId',
              },
              {
                path: 'items.productId',
              },
            ],
          })
          .populate('deliver');
        return order;
      }),
    );
    return res.status(200).json(orders);
  },
  getOrders: async (req, res) => {
    const name = req.query.customerName;
    const address = req.query.address;
    const phone = req.query.phone;
    const status = req.query.status;

    const bodyQuery = {};

    if (name) {
      bodyQuery.customerName = { $regex: '.*' + name + '.*' };
    }
    if (address) {
      bodyQuery.customerAddress = { $regex: '.*' + address + '.*' };
    }
    if (phone) {
      bodyQuery.customerPhone = phone;
    }
    if (status) {
      bodyQuery.orderStatus = status;
    }

    const orders = await orderModel.find(bodyQuery).populate({
      path: 'cartId',
      populate: [
        {
          path: 'items.productId',
        },
        {
          path: 'userId',
        },
      ],
    });
    return res.status(200).json(orders);
  },
  updateOrderStatus: async (req, res) => {
    const status = req.body.status;
    const orderId = req.body.orderId;

    const updateOrderStatus = await orderModel.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true },
    );
  return res.status(200).json(updateOrderStatus)},
};
