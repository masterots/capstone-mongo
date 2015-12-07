'use strict';

var _mongodb = require('mongodb');

var _authors = require('./authors');

var _authors2 = _interopRequireDefault(_authors);

var _books = require('./books');

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

var url = 'mongodb://localhost:27017/capstone-mongo';

_mongodb.MongoClient.connect(url).then(function _callee(conn) {
  var authors, books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        authors = _authors2.default.createAuthors();
        _context.next = 4;
        return regeneratorRuntime.awrap(_books2.default.createBooks(conn, authors));

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