const { Schema, model } = require('mongoose');

const wordSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    type: [
      {
        type: String,
        require: true,
        enum: ['n', 'adj', 'adv', 'v', 'con', 'pre', 'pro', 'det'],
      },
    ],
    mean: {
      type: String,
      required: true,
      trim: true,
    },
    example: {
      type: String,
      trim: true,
    },
    synonyms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'word',
      },
    ],
    antonyms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'word',
      },
    ],
    picture: {
      type: String,
    },
    phonetic: {
      type: String,
    },
    star: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true },
);

const wordModel = model('word', wordSchema, 'word');

module.exports = wordModel;
