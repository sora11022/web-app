const ErrorResponse = require('../helpers/ErrorResponse');
const productImageModel = require('../models/productImages.model');
const productModel = require('../models/products.model');

module.exports = {
  createProductImage: async (req, res) => {
    const body = req.body;
    //lấy ảnh đầu tiên req.files.img[0]
    body.productImage = req.files.productImg[0].filename;
    const product_id = body.productId;
    const existPrd = await productModel.findById(product_id);
    if (!existPrd) {
      throw new ErrorResponse(404, 'Invalid ProductId');
    }
    await productModel.findByIdAndUpdate(product_id);

    const productImg = await productImageModel.create(body);
    return res.status(201).json(productImg);
  },
  getProductImage: async (req, res) => {
    const product_id = req.params.productId;

    const productImages = await productImageModel
      .find({
        productId: product_id,
      })
      .populate('productId')
      .exec();
    return res.status(200).json(productImages);
  },
  deleteProductImage: async (req, res) => {
    const productImg_id = req.params.productImgId;
    const existProductImg = await productImageModel.findById(productImg_id);
    if (!existProductImg) {
      throw new ErrorResponse(404, 'Not Found');
    }
    await productImageModel.findByIdAndDelete(productImg_id);
    return res.status(200).json({ message: 'success' });
  },
};