'use strict';

var _mongodb = require('mongodb');

require("babel-polyfill");

var url = 'mongodb://localhost:27017/capstone-mongo-test-data';

function cleanBooks(db) {
  return regeneratorRuntime.async(function cleanBooks$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').deleteMany({}));

      case 3:
        return _context.abrupt('return', _context.sent);

      case 6:
        _context.prev = 6;
        _context.t0 = _context['catch'](0);

        console.log('could not clean data');
        throw _context.t0;

      case 10:
      case 'end':
        return _context.stop();
    }
  }, null, this, [[0, 6]]);
}

function dropIndexes(db) {
  return regeneratorRuntime.async(function dropIndexes$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.prev = 0;
        _context2.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').dropIndexes());

      case 3:
        return _context2.abrupt('return', _context2.sent);

      case 6:
        _context2.prev = 6;
        _context2.t0 = _context2['catch'](0);

        console.log('could not drop indexes');
        throw _context2.t0;

      case 10:
      case 'end':
        return _context2.stop();
    }
  }, null, this, [[0, 6]]);
}

function createData(db) {
  var authors, authorOne, authorTwo, books, bookOne, bookTwo, bookThree;
  return regeneratorRuntime.async(function createData$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.prev = 0;
        _context3.next = 3;
        return regeneratorRuntime.awrap(cleanBooks(db));

      case 3:
        // await dropIndexes(db);

        authors = [];
        authorOne = {
          name: 'Tom Clancy',
          age: 32,
          birthCountry: 'US'
        };

        authors.push(authorOne);
        authorTwo = {
          name: 'Stephen King',
          age: 65,
          birthCountry: 'US'
        };

        authors.push(authorTwo);

        books = [];
        bookOne = {
          title: 'The Dark Tower: The Gunslinger',
          authors: [authors[1]],
          ISBN: '978-0-937986-50-9',
          releaseDate: new Date(1982, 6, 10),
          firstPublishCountry: 'US',
          publisherName: 'Grant',
          description: 'The book tells the story of The Gunslinger, Roland of Gilead, and his quest to catch the man in black, the first of many steps towards Roland\'s ultimate destination: The Dark Tower.'
        };

        books.push(bookOne);
        bookTwo = {
          title: 'Rainbow Six',
          authors: [authors[0]],
          ISBN: '0-399-14390-4',
          releaseDate: new Date(1998, 8, 1),
          firstPublishCountry: 'US',
          publisherName: 'G. P. Putnam\'s Sons',
          description: 'Central Intelligence Agency operative John Clark and Domingo Chavez join Special Air Service (SAS) officer Alistair Stanley in forming an elite multinational counter-terrorist unit known as Rainbow, based in Hereford, United Kingdom.'
        };

        books.push(bookTwo);
        bookThree = {
          title: 'The Tommyknockers',
          authors: authors,
          ISBN: '978-0-399-13314-5',
          releaseDate: new Date(1987, 11, 10),
          firstPublishCountry: 'US',
          publisherName: 'Putnam',
          description: 'While walking in the woods near the small town of Haven, Maine, Roberta (Bobbi) Anderson, a writer of Wild West-themed fiction, stumbles upon a metal object that turns out to be a protrusion of a long-buried alien spacecraft.'
        };

        books.push(bookThree);
        _context3.next = 17;
        return regeneratorRuntime.awrap(db.collection('books').insertMany(books));

      case 17:
        books = _context3.sent;

        db.collection('books').createIndex({
          'title': 'text',
          'authors.name': 'text',
          'publisherName': 'text'
        });
        db.collection('books').createIndex({
          'ISBN': 1
        });
        // bookcount = await db.collection('books').find().count();
        return _context3.abrupt('return');

      case 23:
        _context3.prev = 23;
        _context3.t0 = _context3['catch'](0);
        throw _context3.t0;

      case 26:
      case 'end':
        return _context3.stop();
    }
  }, null, this, [[0, 23]]);
}

_mongodb.MongoClient.connect(url).then(function _callee(conn) {
  var books;
  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        _context4.prev = 0;
        _context4.next = 3;
        return regeneratorRuntime.awrap(createData(conn));

      case 3:
        books = _context4.sent;

        // console.log('good to go');
        process.exit(0);
        _context4.next = 11;
        break;

      case 7:
        _context4.prev = 7;
        _context4.t0 = _context4['catch'](0);

        console.log('main blew up', _context4.t0);
        process.exit(1);

      case 11:
      case 'end':
        return _context4.stop();
    }
  }, null, this, [[0, 7]]);
});