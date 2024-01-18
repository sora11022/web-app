const mongoose = require('mongoose');

const productImageSchema = mongoose.Schema(
  {
    productImage: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('productImage', productImageSchema);
