'use strict';

require("babel-polyfill");
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/capstone-mongo';

function connect() {
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return regeneratorRuntime.awrap(MongoClient.connect(url));

      case 2:
        return _context.abrupt('return', _context.sent);

      case 3:
      case 'end':
        return _context.stop();
    }
  }, null, this);
}

function tryConnection() {
  var connection, book;
  return regeneratorRuntime.async(function tryConnection$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.prev = 0;
        _context2.next = 3;
        return regeneratorRuntime.awrap(connect());

      case 3:
        connection = _context2.sent;
        _context2.next = 6;
        return regeneratorRuntime.awrap(findBook(connection));

      case 6:
        book = _context2.sent;

        console.log(book);
        process.exit(0);
        _context2.next = 15;
        break;

      case 11:
        _context2.prev = 11;
        _context2.t0 = _context2['catch'](0);

        console.log(_context2.t0);
        process.exit(1);

      case 15:
      case 'end':
        return _context2.stop();
    }
  }, null, this, [[0, 11]]);
}

function findBook(db) {
  var books;
  return regeneratorRuntime.async(function findBook$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.prev = 0;
        _context3.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').findOne());

      case 3:
        books = _context3.sent;
        return _context3.abrupt('return', books);

      case 7:
        _context3.prev = 7;
        _context3.t0 = _context3['catch'](0);
        throw _context3.t0;

      case 10:
      case 'end':
        return _context3.stop();
    }
  }, null, this, [[0, 7]]);
}

tryConnection();