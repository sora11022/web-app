const ErrorResponse = require('../helpers/ErrorResponse');
const cartModel = require('../models/carts.model');
const productModel = require('../models/products.model');

module.exports = {
  createOrUpdateCart: async (req, res) => {
    const userId = req.params.userId;
    const body = req.body;
    const cart = await cartModel.findOne({
      userId: userId,
      isOrdered: false,
    });
    let newCart;
    if (!cart) {
      newCart = new cartModel({});
    } else {
      newCart = cart;
    }
    //add item to cart
    const product = await productModel.findById(body.productId);
    const itemIndex = newCart.items.findIndex(
      (p) => p.productId == body.productId,
    );
    if (itemIndex > -1) {
      //update quantity if items exist in cart
      newCart.items[itemIndex].quantity = body.quantity;
      newCart.items[itemIndex].price =
        newCart.items[itemIndex].quantity * product.price;
    } else {
      // if product didnt exist in cart => find from db to add new item
      newCart.items.push({
        productId: body.productId,
        quantity: body.quantity,
        price: product.price * body.quantity,
      });
    }
    newCart.totalPrice = newCart.items.reduce(
      (total, item) => total + item.price,
      0,
    );
    //save cart
    if (userId) {
      newCart.userId = userId;
      await newCart.save();
    }
    return res.status(200).json(newCart);
  },
  getCart: async (req, res) => {
    const userId = req.params.userId;
    const isOrdered = req.query.order;
    const findCartById = {
      userId: userId,
    };
    if (isOrdered) {
      findCartById.isOrdered = isOrdered;
    }
    const getCart = await cartModel
      .findOne(findCartById)
      .populate('items.productId');
    if (!getCart) {
      throw new ErrorResponse(404, 'No items is on the list now');
    }
    return res.status(200).json(getCart);
  },
  deleteAndUpdateItem: async (req, res) => {
    const userId = req.params.userId;
    const isOrdered = req.query.order;
    const productId = req.body.productId;
    const cart = await cartModel.findOne({
      userId: userId,
      isOrdered: isOrdered,
    });
    //find item with productid
    const product = await productModel.findById(productId);
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity--;
      cart.items[itemIndex].price =
        cart.items[itemIndex].quantity * product.price;
      if (cart.items[itemIndex].quantity <= 0) {
        await cart.items.remove({ _id: cart.items[itemIndex]._id });
      }
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price,
        0,
      );
      if (userId) {
        await cart.save();
      }
    }
    return res.status(200).json(cart);
  },
  removeItem: async (req, res) => {
    const userId = req.params.userId;
    const isOrdered = req.query.order;
    const productId = req.body.productId;
    const cart = await cartModel.findOne({
      userId: userId,
      isOrdered: isOrdered,
    });
    //find item with productid
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      await cart.items.remove({ _id: cart.items[itemIndex]._id });
    }
    newCart.totalPrice = newCart.items.reduce(
      (total, item) => total + item.price,
      0,
    );
    if (userId) {
      await cart.save();
    }
    return res.status(200).json(cart);
  },
  incrementItem: async (req, res) => {
    const userId = req.params.userId;
    const isOrdered = req.query.order;
    const productId = req.body.productId;
    const cart = await cartModel.findOne({
      userId: userId,
      isOrdered: isOrdered,
    });
    //find item with productid
    const product = await productModel.findById(productId);
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity++;
      cart.items[itemIndex].price =
        cart.items[itemIndex].quantity * product.price;
    }
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
    if (userId) {
      await cart.save();
    }
    return res.status(200).json(cart);
  },
};
