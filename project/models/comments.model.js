const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    commentContent: {
      type: String,
      required: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
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

module.exports = mongoose.model('comment', commentSchema);
