'use strict';

var _book = require('../schemas/book');

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import authorGenerator from './authors';

var chance = new _chance2.default(12345);

function cleanBooks() {
  return regeneratorRuntime.async(function cleanBooks$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return regeneratorRuntime.awrap(_book.Book.remove({}));

      case 2:
        return _context.abrupt('return', _context.sent);

      case 3:
      case 'end':
        return _context.stop();
    }
  }, null, this);
}

function createBooks(authors) {
  var max, min, numBooksToMake, numTimesToMakeBooks, publishers, i, books, outer, selectedAuthors, year, book;
  return regeneratorRuntime.async(function createBooks$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return regeneratorRuntime.awrap(cleanBooks());

      case 2:
        max = 9;
        min = 1;
        numBooksToMake = 20;
        numTimesToMakeBooks = 1;
        publishers = [];

        for (i = 0; i < 8; i++) {
          publishers.push(chance.last());
        }
        _context2.prev = 8;
        books = [];
        outer = 0;

      case 11:
        if (!(outer < numTimesToMakeBooks)) {
          _context2.next = 21;
          break;
        }

        for (i = 0; i < numBooksToMake; i++) {
          selectedAuthors = _lodash2.default.sample(authors, _lodash2.default.random(min, max));
          year = chance.integer({ min: 1999, max: 2014 });
          book = new _book.Book({
            title: chance.sentence({ words: 5 }),
            authors: selectedAuthors,
            ISBN: chance.string({ pool: '1234567890-', length: 13 }),
            releaseDate: chance.date({ year: year }),
            firstPublishCountry: chance.country(),
            publisherName: _lodash2.default.sample(publishers),
            description: chance.paragraph({ sentences: 2 })
          });

          books.push(book);
        }
        console.log(numBooksToMake + ' books created');
        _context2.next = 16;
        return regeneratorRuntime.awrap(_book.Book.create(books));

      case 16:
        console.log(numBooksToMake + ' books saved: loop #' + outer);
        books = [];

      case 18:
        outer++;
        _context2.next = 11;
        break;

      case 21:
        return _context2.abrupt('return');

      case 24:
        _context2.prev = 24;
        _context2.t0 = _context2['catch'](8);

        console.log('createBooks blew up', _context2.t0);
        process.exit(1);

      case 28:
      case 'end':
        return _context2.stop();
    }
  }, null, this, [[8, 24]]);
}

module.exports = {
  createBooks: createBooks
};