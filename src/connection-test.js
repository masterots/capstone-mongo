require("babel-polyfill");
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/capstone-mongo';

async function connect() {
  return await MongoClient.connect(url);
}

async function tryConnection() {
  try {
    let connection = await connect();
    let book = await findBook(connection);
    console.log(book);
    process.exit(0);
  }
  catch (e) {
    console.log(e);
    process.exit(1);
  }
}

async function findBook(db) {
  try {
    let books = await db.collection('books').findOne();
    return books;
  }
  catch (e) {
    throw e;
  }
}

tryConnection();