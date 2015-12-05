import mongoose from 'mongoose';
import {authorSchema} from './author';


var bookSchema = mongoose.Schema({
  title: String,
  authors: [authorSchema],
  ISBN: String,
  releaseDate: { type: Date, default: Date.now },
  firstPublishCountry: String,
  publisherName: String,
  description: String
});

bookSchema.index({'title': 'text', 'authors.name': 'text'});

var Book = mongoose.model('Book', bookSchema);

module.exports = {
  Book: Book
};