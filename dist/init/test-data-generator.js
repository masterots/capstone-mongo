'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _author = require('../schemas/author');

var _book = require('../schemas/book');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

_mongoose2.default.connect('mongodb://localhost/capstone-mongo-test-data');
var db = _mongoose2.default.connection;

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

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function _callee() {
  var authors, authorOne, authorTwo, books, bookOne, bookTwo, bookThree;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.prev = 0;
        _context2.next = 3;
        return regeneratorRuntime.awrap(cleanBooks());

      case 3:
        authors = [];
        authorOne = new _author.Author({
          name: 'Tom Clancy',
          age: 32,
          birthCountry: 'US'
        });

        authors.push(authorOne);
        authorTwo = new _author.Author({
          name: 'Stephen King',
          age: 65,
          birthCountry: 'US'
        });

        authors.push(authorTwo);

        books = [];
        bookOne = new _book.Book({
          title: 'The Dark Tower: The Gunslinger',
          authors: authors[1],
          ISBN: '978-0-937986-50-9',
          releaseDate: '1982-06-10',
          firstPublishCountry: 'US',
          publisherName: 'Grant',
          description: 'The book tells the story of The Gunslinger, Roland of Gilead, and his quest to catch the man in black, the first of many steps towards Roland\'s ultimate destination: The Dark Tower.'
        });

        books.push(bookOne);
        bookTwo = new _book.Book({
          title: 'Rainbow Six',
          authors: authors[0],
          ISBN: '0-399-14390-4',
          releaseDate: '1998-08-01',
          firstPublishCountry: 'US',
          publisherName: 'G. P. Putnam\'s Sons',
          description: 'Central Intelligence Agency operative John Clark and Domingo Chavez join Special Air Service (SAS) officer Alistair Stanley in forming an elite multinational counter-terrorist unit known as Rainbow, based in Hereford, United Kingdom.'
        });

        books.push(bookTwo);
        bookThree = new _book.Book({
          title: 'The Tommyknockers',
          authors: authors,
          ISBN: '978-0-399-13314-5',
          releaseDate: '1987-11-10',
          firstPublishCountry: 'US',
          publisherName: 'Putnam',
          description: 'While walking in the woods near the small town of Haven, Maine, Roberta (Bobbi) Anderson, a writer of Wild West-themed fiction, stumbles upon a metal object that turns out to be a protrusion of a long-buried alien spacecraft.'
        });

        books.push(bookThree);
        _context2.next = 17;
        return regeneratorRuntime.awrap(_book.Book.create(books));

      case 17:
        books = _context2.sent;

        console.log('good to go');
        process.exit(0);
        _context2.next = 26;
        break;

      case 22:
        _context2.prev = 22;
        _context2.t0 = _context2['catch'](0);

        console.log('main blew up', _context2.t0);
        process.exit(1);

      case 26:
      case 'end':
        return _context2.stop();
    }
  }, null, this, [[0, 22]]);
});