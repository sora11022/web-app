const mongoose = require('mongoose');
const typeStatus = require('../constants/type.status');

const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    orderItem: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: [
        'On Confirmation',
        'On Packaging',
        'On Delivery',
        'Received',
        'Completed',
        'Cancelled',
        'Refund',
      ],
      default: 'On Confirmation',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash, Transaction'],
      default: 'Cash',
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cart',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('order', orderSchema);
