'use strict';

require("babel-polyfill");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capstone-mongo');
var db = mongoose.connection;
var authorGenerator = require('./authors');
var bookGenerator = require('./books');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function _callee() {
  var authors, books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        authors = authorGenerator.createAuthors();
        _context.next = 4;
        return regeneratorRuntime.awrap(bookGenerator.createBooks(authors));

      case 4:
        books = _context.sent;

        console.log('good to go');
        process.exit(0);
        _context.next = 13;
        break;

      case 9:
        _context.prev = 9;
        _context.t0 = _context['catch'](0);

        console.log('main blew up', _context.t0);
        process.exit(1);

      case 13:
      case 'end':
        return _context.stop();
    }
  }, null, this, [[0, 9]]);
});