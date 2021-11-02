const { Schema, model } = require('mongoose');

const flashcardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
    },
    words: [
      {
        type: Schema.Types.ObjectId,
        ref: 'word',
      },
    ],
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'topic',
    },
    sentences: [
      {
        type: Schema.Types.ObjectId,
        ref: 'sentence',
      },
    ],
    stars: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true },
);

const flashcardModel = model('flashcard', flashcardSchema, 'flashcard');

module.exports = flashcardModel;
