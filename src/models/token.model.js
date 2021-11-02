const mongoose = require('mongoose');
const tokenTypes = require('../constant/token');

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const tokenModel = mongoose.model('token', tokenSchema, 'token');

module.exports = tokenModel;
