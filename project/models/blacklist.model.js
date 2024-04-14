const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: { type: Date, expires: '15m', default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('blacklist', blacklistSchema);
