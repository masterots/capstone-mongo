require("babel-polyfill");

import {MongoClient} from 'mongodb';
import authorGenerator from './authors';
import bookGenerator from './books';

let url = 'mongodb://localhost:27017/capstone-mongo';

MongoClient.connect(url)
  .then(async function(conn) {
    try {
      let authors = authorGenerator.createAuthors();
      let books = await bookGenerator.createBooks(conn, authors);
      console.log('good to go');
      process.exit(0);
    }
    catch (e) {
      console.log('main blew up', e);
      process.exit(1);
    }
  });