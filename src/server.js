require("babel-polyfill");

import express from 'express';
import {MongoClient} from 'mongodb';
import queries from './queries/books';
import reports from './reports/books';

let app = express();
let url = 'mongodb://localhost:27017/capstone-mongo';
let connection = null;


function missingQueryArg(arg, res) {
  res.json({
    error: `missing required argument: ${arg}`
  });
}

function missingUriParam(param, res) {
  res.json({
    error: `missing required uri parameter: ${param}`
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

app.get('/books/isbn', async function(req, res) {
  let isbn = req.query.isbn;
  if (!isbn) {
    return missingQueryArg('isbn', res);
  }
  let books = await queries.findBookByISBN(connection, isbn);
  res.json(books);
});

app.get('/books/author', async function(req, res) {
  let author = req.query.author;
  if (!author) {
    return missingQueryArg('author', res);
  }
  let books = await queries.findBooksByAuthor(connection, author);
  res.json(books);
});

app.get('/books/publisher', async function(req, res) {
  let publisher = req.query.publisher;
  if (!publisher) {
    return missingQueryArg('publisher', res);
  }  let books = await queries.findBooksByPublisher(connection, publisher);
  res.json(books);
});

app.get('/books/title', async function(req, res) {
  let title = req.query.title;
  if (!title) {
    return missingQueryArg('title', res);
  }
  let books = await queries.findBooksByTitle(connection, title);
  res.json(books);
});

app.get('/reports/countBooksReleasedPerYear', async function(req, res) {
  let data = await reports.countBooksReleasedPerYear(connection);
  res.json(data);
});

app.get('/reports/countBooksReleasedPerYearPerPublisher', async function(req, res) {
  let data = await reports.countBooksReleasedPerYearPerPublisher(connection);
  res.json(data);
});

app.get('/reports/booksByAuthor', async function(req, res) {
  let data = await reports.booksByAuthor(connection);
  res.json(data);
});

app.get('/reports/avgNumAuthorsPerBookPerYear', async function(req, res) {
  let books = await reports.avgNumAuthorsPerBookPerYear(connection);
  res.json(books);
});

MongoClient.connect(url)
.then(function(conn) {
  connection = conn;
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
});
