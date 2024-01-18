const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const typeRole = require('../constants/type.role');
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    isActive: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    role: {
      type: String,
      enum: Array.from(typeRole),
      default: typeRole.USER,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// xoa password khi tra ve json
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
  },
});

userSchema.pre('save', function (next) {
  const user = this;
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
  next();
});

userSchema.pre('findByIdAndUpdate', function (next) {
  const user = this.getUpdate();
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
  this.setUpdate(user);
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this.getUpdate();
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
  this.setUpdate(user);
  next();
});

module.exports = mongoose.model('user', userSchema);
