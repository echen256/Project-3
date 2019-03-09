const mongoose = require('mongoose');

// Save a reference to the Schema constructor
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  summary: String,
  published_date: { type: Date },
  publisher: String,
  // `comments` is an object that stores a Comment id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Comment
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
});

module.exports = mongoose.model('Article', ArticleSchema);
