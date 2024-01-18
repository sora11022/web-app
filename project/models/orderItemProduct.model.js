const mongoose = require('mongoose');

const orderItemProductSchema = mongoose.Schema(
  {
    orderItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'orderItem',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('orderItemProduct', orderItemProductSchema);
