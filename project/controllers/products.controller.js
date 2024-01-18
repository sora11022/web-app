const productModel = require('../models/products.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const productValid = require('../validations/product.valid');
const categoryModel = require('../models/categories.model');

module.exports = {
  createProduct: async (req, res) => {
    const { productName, description, inStorage, price, newPrice, categoryId } =
      req.body;
    const { error, value } = productValid({
      productName,
      description,
      inStorage,
      price,
      newPrice,
      categoryId,
    });
    if (error) {
      throw new ErrorResponse(400, error.message);
    }
    await categoryModel.findByIdAndUpdate(categoryId);
    const saveProduct = await productModel.create(value);
    return res.status(201).json(saveProduct);
  },
  getProduct: async (req, res) => {
    const perPage = 10;
    let page = parseInt(req.query.page) || 1;

    const productList = await productModel
      .find()
      .populate('categoryId', 'name')
      .sort('-createAt')
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await productModel.countDocuments();

    return res.status(200).json({
      current: page,
      total: Math.ceil(count / perPage),
      count: count,
      data: productList,
    });
  },
  getProductById: async (req, res) => {
    const productId = req.params.id;
    const product = await productModel
      .findById(productId)
      .populate('categoryId', 'name');
    return res.status(200).json(product);
  },
  getProductByCategoryId: async (req, res) => {
    const categoryId = req.params.category_Id;
    const bodyQuery = { categoryId };
    const perPage = 10;
    let page = parseInt(req.query.page) || 1;

    const productList = await productModel
      .find(bodyQuery)
      .populate('categoryId', 'name')
      .sort('-createAt')
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await productModel.countDocuments(bodyQuery);

    return res.status(200).json({
      current: page,
      total: Math.ceil(count / perPage),
      count: count,
      data: productList,
    });
  },
  updateProduct: async (req, res) => {
    const productId = req.params.id;
    const body = req.body;
    const { error, value } = productValid(body);

    if (error) {
      throw new ErrorResponse(400, error.message);
    }
    const existProduct = await productModel.findById(productId);

    if (!existProduct) {
      throw new ErrorResponse(404, 'Invalid productID');
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      value,
      {
        new: true,
      },
    );
    return res.status(200).json(updatedProduct);
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    const existProduct = await productModel.findById(productId);

    if (!existProduct) {
      throw new ErrorResponse(404, 'Invalid productID');
    }
    await productModel.findByIdAndDelete(productId);
    return res.status(204).json();
  },
};
