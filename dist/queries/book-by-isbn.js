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
        return _context.abrupt('return', book);

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

function hello(name) {
  return regeneratorRuntime.async(function hello$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        return _context2.abrupt('return', 'Hello ' + name);

      case 1:
      case 'end':
        return _context2.stop();
    }
  }, null, this);
}

module.exports = {
  findBookByISBN: findBookByISBN,
  hello: hello
};