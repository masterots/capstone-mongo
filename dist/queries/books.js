'use strict';

require("babel-polyfill");

function findBookByISBN(db, ISBN) {
  var book;
  return regeneratorRuntime.async(function findBookByISBN$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').findOne({ 'ISBN': ISBN }));

      case 3:
        book = _context.sent;
        return _context.abrupt('return', book || []);

      case 7:
        _context.prev = 7;
        _context.t0 = _context['catch'](0);
        throw _context.t0;

      case 10:
      case 'end':
        return _context.stop();
    }
  }, null, this, [[0, 7]]);
}

function findBooksByTitle(db, title) {
  var books;
  return regeneratorRuntime.async(function findBooksByTitle$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.prev = 0;
        _context2.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').find({ 'title': title }).sort({ 'releaseDate': 1 }));

      case 3:
        books = _context2.sent;
        return _context2.abrupt('return', books ? books.toArray() : []);

      case 7:
        _context2.prev = 7;
        _context2.t0 = _context2['catch'](0);
        throw _context2.t0;

      case 10:
      case 'end':
        return _context2.stop();
    }
  }, null, this, [[0, 7]]);
}

function findBooksByAuthor(db, authorName) {
  var books;
  return regeneratorRuntime.async(function findBooksByAuthor$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.prev = 0;
        _context3.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').find({ 'authors.name': authorName }).sort({ 'releaseDate': 1 }));

      case 3:
        books = _context3.sent;
        return _context3.abrupt('return', books ? books.toArray() : []);

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

function findBooksByPublisher(db, publisherName) {
  var books;
  return regeneratorRuntime.async(function findBooksByPublisher$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        _context4.prev = 0;
        _context4.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').find({ 'publisherName': publisherName }).sort({ 'releaseDate': 1 }));

      case 3:
        books = _context4.sent;
        return _context4.abrupt('return', books ? books.toArray() : []);

      case 7:
        _context4.prev = 7;
        _context4.t0 = _context4['catch'](0);
        throw _context4.t0;

      case 10:
      case 'end':
        return _context4.stop();
    }
  }, null, this, [[0, 7]]);
}

module.exports = {
  findBookByISBN: findBookByISBN,
  findBooksByTitle: findBooksByTitle,
  findBooksByAuthor: findBooksByAuthor,
  findBooksByPublisher: findBooksByPublisher
};