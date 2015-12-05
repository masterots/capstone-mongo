'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _books = require('./queries/books');

var _books2 = _interopRequireDefault(_books);

var _books3 = require('./reports/books');

var _books4 = _interopRequireDefault(_books3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

var app = (0, _express2.default)();
var url = 'mongodb://localhost:27017/capstone-mongo';
var connection = null;

function missingQueryArg(arg, res) {
  res.json({
    error: 'missing required argument: ' + arg
  });
}

function missingUriParam(param, res) {
  res.json({
    error: 'missing required uri parameter: ' + param
  });
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// app.get('/authors', async function(req, res) {
//   let options = {};
//   if (req.query.author) {
//     options = {
//       'name': req.query.author
//     }
//   }
//   let authors = await Author.find(options).exec();
//   res.json(authors);
// });

app.get('/books/isbn', function _callee(req, res) {
  var isbn, books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        isbn = req.query.isbn;

        if (isbn) {
          _context.next = 3;
          break;
        }

        return _context.abrupt('return', missingQueryArg('isbn', res));

      case 3:
        _context.next = 5;
        return regeneratorRuntime.awrap(_books2.default.findBookByISBN(connection, isbn));

      case 5:
        books = _context.sent;

        res.json(books);

      case 7:
      case 'end':
        return _context.stop();
    }
  }, null, this);
});

app.get('/books/author', function _callee2(req, res) {
  var author, books;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        author = req.query.author;

        if (author) {
          _context2.next = 3;
          break;
        }

        return _context2.abrupt('return', missingQueryArg('author', res));

      case 3:
        _context2.next = 5;
        return regeneratorRuntime.awrap(_books2.default.findBooksByAuthor(connection, author));

      case 5:
        books = _context2.sent;

        res.json(books);

      case 7:
      case 'end':
        return _context2.stop();
    }
  }, null, this);
});

app.get('/books/publisher', function _callee3(req, res) {
  var publisher, books;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        publisher = req.query.publisher;

        if (publisher) {
          _context3.next = 3;
          break;
        }

        return _context3.abrupt('return', missingQueryArg('publisher', res));

      case 3:
        _context3.next = 5;
        return regeneratorRuntime.awrap(_books2.default.findBooksByPublisher(connection, publisher));

      case 5:
        books = _context3.sent;

        res.json(books);

      case 7:
      case 'end':
        return _context3.stop();
    }
  }, null, this);
});

app.get('/books/title', function _callee4(req, res) {
  var title, books;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        title = req.query.title;

        if (title) {
          _context4.next = 3;
          break;
        }

        return _context4.abrupt('return', missingQueryArg('title', res));

      case 3:
        _context4.next = 5;
        return regeneratorRuntime.awrap(_books2.default.findBooksByTitle(connection, title));

      case 5:
        books = _context4.sent;

        res.json(books);

      case 7:
      case 'end':
        return _context4.stop();
    }
  }, null, this);
});

app.get('/reports/countBooksReleasedPerYear', function _callee5(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        _context5.next = 2;
        return regeneratorRuntime.awrap(_books4.default.countBooksReleasedPerYear(connection));

      case 2:
        data = _context5.sent;

        res.json(data);

      case 4:
      case 'end':
        return _context5.stop();
    }
  }, null, this);
});

app.get('/reports/countBooksReleasedPerYearPerPublisher', function _callee6(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        _context6.next = 2;
        return regeneratorRuntime.awrap(_books4.default.countBooksReleasedPerYearPerPublisher(connection));

      case 2:
        data = _context6.sent;

        res.json(data);

      case 4:
      case 'end':
        return _context6.stop();
    }
  }, null, this);
});

app.get('/reports/booksByAuthor', function _callee7(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        _context7.next = 2;
        return regeneratorRuntime.awrap(_books4.default.booksByAuthor(connection));

      case 2:
        data = _context7.sent;

        res.json(data);

      case 4:
      case 'end':
        return _context7.stop();
    }
  }, null, this);
});

app.get('/reports/avgNumAuthorsPerBookPerYear', function _callee8(req, res) {
  var books;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        _context8.next = 2;
        return regeneratorRuntime.awrap(_books4.default.avgNumAuthorsPerBookPerYear(connection));

      case 2:
        books = _context8.sent;

        res.json(books);

      case 4:
      case 'end':
        return _context8.stop();
    }
  }, null, this);
});

_mongodb.MongoClient.connect(url).then(function (conn) {
  connection = conn;
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
});