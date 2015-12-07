'use strict';

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chance = new _chance2.default(12345);

function cleanBooks(db) {
  return regeneratorRuntime.async(function cleanBooks$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return regeneratorRuntime.awrap(db.collection('books').remove({}));

      case 2:
        return _context.abrupt('return', _context.sent);

      case 3:
      case 'end':
        return _context.stop();
    }
  }, null, this);
}

function dropIndexes(db) {
  return regeneratorRuntime.async(function dropIndexes$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return regeneratorRuntime.awrap(db.collection('books').dropIndexes());

      case 2:
        return _context2.abrupt('return', _context2.sent);

      case 3:
      case 'end':
        return _context2.stop();
    }
  }, null, this);
}

function createBooks(db, authors) {
  var max, min, numBooksToMake, numTimesToMakeBooks, publishers, i, books, outer, selectedAuthors, year, book;
  return regeneratorRuntime.async(function createBooks$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.next = 2;
        return regeneratorRuntime.awrap(cleanBooks(db));

      case 2:
        _context3.next = 4;
        return regeneratorRuntime.awrap(dropIndexes(db));

      case 4:
        max = 9;
        min = 1;
        numBooksToMake = 100;
        numTimesToMakeBooks = 5000;
        publishers = [];

        for (i = 0; i < 8; i++) {
          publishers.push(chance.last());
        }
        _context3.prev = 10;
        books = [];
        outer = 0;

      case 13:
        if (!(outer < numTimesToMakeBooks)) {
          _context3.next = 25;
          break;
        }

        for (i = 0; i < numBooksToMake; i++) {
          selectedAuthors = _lodash2.default.sample(authors, _lodash2.default.random(min, max));
          year = chance.integer({ min: 1999, max: 2014 });
          book = {
            title: chance.sentence({ words: 5 }),
            authors: selectedAuthors,
            ISBN: chance.string({ pool: '1234567890-', length: 13 }),
            releaseDate: chance.date({ year: year }),
            firstPublishCountry: chance.country(),
            publisherName: _lodash2.default.sample(publishers),
            description: chance.paragraph({ sentences: 2 })
          };

          books.push(book);
        }
        console.log(numBooksToMake + ' books created');
        _context3.next = 18;
        return regeneratorRuntime.awrap(db.collection('books').insertMany(books));

      case 18:
        db.collection('books').createIndex({
          'title': 'text',
          'authors.name': 'text',
          'publisherName': 'text'
        });
        db.collection('books').createIndex({
          'ISBN': 1
        });
        console.log(numBooksToMake + ' books saved: loop #' + outer);
        books = [];

      case 22:
        outer++;
        _context3.next = 13;
        break;

      case 25:
        return _context3.abrupt('return');

      case 28:
        _context3.prev = 28;
        _context3.t0 = _context3['catch'](10);

        console.log('createBooks blew up', _context3.t0);
        process.exit(1);

      case 32:
      case 'end':
        return _context3.stop();
    }
  }, null, this, [[10, 28]]);
}

module.exports = {
  createBooks: createBooks
};