const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    isOrdered: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: Number,
      default: false,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('cart', cartSchema);
