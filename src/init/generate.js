require("babel-polyfill");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capstone-mongo');
var db = mongoose.connection;
var authorGenerator = require('./authors');
var bookGenerator = require('./books');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  try {
    let authors = authorGenerator.createAuthors();
    let books = await bookGenerator.createBooks(authors);
    console.log('good to go');
    process.exit(0);
  }
  catch (e) {
    console.log('main blew up', e);
    process.exit(1);
  }
});