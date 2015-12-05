'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _author = require('./author');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookSchema = _mongoose2.default.Schema({
  title: String,
  authors: [_author.authorSchema],
  ISBN: String,
  releaseDate: { type: Date, default: Date.now },
  firstPublishCountry: String,
  publisherName: String,
  description: String
});

bookSchema.index({ 'title': 'text', 'authors.name': 'text' });

var Book = _mongoose2.default.model('Book', bookSchema);

module.exports = {
  Book: Book
};