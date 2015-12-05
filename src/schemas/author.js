var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
  name: String,
  age: Number,
  birthCountry: String
}, { autoIndex: false });

var Author = mongoose.model('Author', authorSchema);

module.exports = {
  authorSchema: authorSchema,
  Author: Author
};