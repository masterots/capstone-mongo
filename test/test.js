require("babel-polyfill");
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/capstone-mongo-test-data';

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();
var books = require('../dist/queries/books');
var reports = require('../dist/reports/books');

var connection = null;

before(function(done) {
  if (!connection) {
    MongoClient.connect(url)
    .then(function(conn) {
      connection = conn;
      done();
    });
  } else {
    done();
  }
});

describe('Books', function() {
  it('should return a book by ISBN', async function(done) {
    try {
      var book = await books.findBookByISBN(connection, '978-0-937986-50-9');
      book.title.should.equal('The Dark Tower: The Gunslinger');
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('should return a book by title search', async function(done) {
    try {
      var book = await books.findBooksByTitle(connection, 'The Dark Tower: The Gunslinger');
      book[0].ISBN.should.equal('978-0-937986-50-9');
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('should return a book by author', async function(done) {
    try {
      var book = await books.findBooksByAuthor(connection, 'Stephen King');
      book[0].title.should.equal('The Dark Tower: The Gunslinger');
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('should return a book by publisher', async function(done) {
    try {
      var book = await books.findBooksByPublisher(connection, 'Grant');
      book[0].title.should.equal('The Dark Tower: The Gunslinger');
      done();
    }
    catch (e) {
      done(e);
    }
  });
});

describe('Reports', function() {
  it('should return json for number of books released by year', async function(done) {
    try {
      var results = await reports.countBooksReleasedPerYear(connection);
      results.should.deep.equal([
        { _id: 1982, count: 1 },
        { _id: 1987, count: 1 },
        { _id: 1998, count: 1 }
      ]);
      done();
    }
    catch(e) {
      done(e);
    }
  });

  it('should return json for number of books released by year per publisher', async function(done) {
    try {
      var results = await reports.countBooksReleasedPerYearPerPublisher(connection);
      results.should.deep.equal([
         {
          publisher: "Grant",
          books: [{
            year: 1982,
            count: 1
          }]
         },
         {
          publisher: "G. P. Putnam's Sons",
          books: [{
            year: 1998,
            count: 1
          }]
         },
         {
          publisher: "Putnam",
          books: [{
            year: 1987,
            count: 1
          }]
         }
       ]);
      done();
    }
    catch(e) {
      done(e);
    }
  });

  it('should return json for books and isbn by author', async function(done) {
    try {
      var results = await reports.booksByAuthor(connection);
      results.should.deep.equal([{
        _id: 'Tom Clancy',
        books: [
          {
            title: 'Rainbow Six',
            isbn: '0-399-14390-4'
          },{
            title: 'The Tommyknockers',
            isbn: '978-0-399-13314-5'
          }
        ]
      },{
        _id: 'Stephen King',
        books: [
          {
            title: 'The Dark Tower: The Gunslinger',
            isbn: '978-0-937986-50-9'
          },{
            title: 'The Tommyknockers',
            isbn: '978-0-399-13314-5'
          }
        ]
      }]);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('should return json for avg number of authors per book per year', async function(done) {
    try {
      var results = await reports.avgNumAuthorsPerBookPerYear(connection);
      results.should.deep.equal([{
        year: 1982,
        avgNumAuthorsPerBook: 1
      },{
        year: 1987,
        avgNumAuthorsPerBook: 2
      },{
        year: 1998,
        avgNumAuthorsPerBook: 1
      }]);
      done();
    }
    catch (e) {
      done(e);
    }
  });
});