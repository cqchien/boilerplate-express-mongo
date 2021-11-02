const { Schema, model } = require('mongoose');

const sentenceSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    mean: {
      type: String,
      required: true,
      trim: true,
    },
    stars: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true },
);

const sentenceModel = model('sentence', sentenceSchema, 'sentence');

module.exports = sentenceModel;
