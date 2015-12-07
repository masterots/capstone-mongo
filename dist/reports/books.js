"use strict";

require("babel-polyfill");

function countBooksReleasedPerYear(db) {
  var results;
  return regeneratorRuntime.async(function countBooksReleasedPerYear$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').aggregate([{
          $group: {
            _id: {
              $year: "$releaseDate"
            },
            count: {
              $sum: 1
            }
          }
        }, {
          $sort: {
            _id: 1
          }
        }]).toArray());

      case 3:
        results = _context.sent;
        return _context.abrupt("return", results);

      case 7:
        _context.prev = 7;
        _context.t0 = _context["catch"](0);
        throw _context.t0;

      case 10:
      case "end":
        return _context.stop();
    }
  }, null, this, [[0, 7]]);
}

function countBooksReleasedPerYearPerPublisher(db) {
  var results;
  return regeneratorRuntime.async(function countBooksReleasedPerYearPerPublisher$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.prev = 0;
        _context2.next = 3;
        return regeneratorRuntime.awrap(db.collection('books').aggregate([{
          $group: {
            _id: {
              PublisherName: "$publisherName",
              year: {
                $year: "$releaseDate"
              }
            },
            count: {
              $sum: 1
            }
          }
        }, {
          $group: {
            _id: "$_id.PublisherName",
            books: {
              $push: {
                year: "$_id.year",
                count: "$count"
              }
            }
          }
        }, {
          $sort: {
            PublisherName: 1
          }
        }, {
          $project: {
            _id: 0,
            publisher: "$_id",
            books: 1
          }
        }]).toArray());

      case 3:
        results = _context2.sent;
        return _context2.abrupt("return", results);

      case 7:
        _context2.prev = 7;
        _context2.t0 = _context2["catch"](0);
        throw _context2.t0;

      case 10:
      case "end":
        return _context2.stop();
    }
  }, null, this, [[0, 7]]);
}

function booksByAuthor(db) {
  var results;
  return regeneratorRuntime.async(function booksByAuthor$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.prev = 0;
        results = db.collection('books').aggregate([{
          $unwind: "$authors"
        }, {
          $group: {
            _id: "$authors.name",
            books: {
              $push: {
                title: "$title".toString(),
                isbn: "$ISBN"
              }
            }
          }
        }]).toArray();
        return _context3.abrupt("return", results);

      case 5:
        _context3.prev = 5;
        _context3.t0 = _context3["catch"](0);
        throw _context3.t0;

      case 8:
      case "end":
        return _context3.stop();
    }
  }, null, this, [[0, 5]]);
}

function avgNumAuthorsPerBookPerYear(db) {
  var results;
  return regeneratorRuntime.async(function avgNumAuthorsPerBookPerYear$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        _context4.prev = 0;
        results = db.collection('books').aggregate([{
          $group: {
            _id: {
              year: {
                $year: "$releaseDate"
              },
              numAuthors: {
                $size: "$authors"
              }
            }
          }
        }, {
          $group: {
            _id: "$_id.year",
            avgNumAuthorsPerBook: {
              $avg: "$_id.numAuthors"
            }
          }
        }, {
          $sort: { _id: 1 }
        }, {
          $project: {
            _id: 0,
            year: "$_id",
            avgNumAuthorsPerBook: 1
          }
        }]).toArray();
        return _context4.abrupt("return", results);

      case 5:
        _context4.prev = 5;
        _context4.t0 = _context4["catch"](0);
        throw _context4.t0;

      case 8:
      case "end":
        return _context4.stop();
    }
  }, null, this, [[0, 5]]);
}

module.exports = {
  countBooksReleasedPerYear: countBooksReleasedPerYear,
  countBooksReleasedPerYearPerPublisher: countBooksReleasedPerYearPerPublisher,
  booksByAuthor: booksByAuthor,
  avgNumAuthorsPerBookPerYear: avgNumAuthorsPerBookPerYear
};