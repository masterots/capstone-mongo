require("babel-polyfill");

async function findBookByISBN(db, ISBN) {
  try {
    let book = await db.collection('books')
                        .findOne({'ISBN': ISBN});
    return book || [];
  }
  catch (e) {
    throw e;
  }
}

async function findBooksByTitle(db, title) {
  try {
    let books = await db.collection('books')
                        .find({'title': title}).sort({'releaseDate': 1});
    return books ? books.toArray() : [];
  }
  catch (e) {
    throw e;
  }
}

async function findBooksByAuthor(db, authorName) {
  try {
    let books = await db.collection('books')
                        .find({'authors.name': authorName}).sort({'releaseDate': 1});
    return books ? books.toArray() : [];
  }
  catch (e) {
    throw e;
  }
}

async function findBooksByPublisher(db, publisherName) {
  try {
    let books = await db.collection('books')
                        .find({'publisherName': publisherName}).sort({'releaseDate': 1});
    return books ? books.toArray() : [];
  }
  catch (e) {
    throw e;
  }
}

module.exports = {
  findBookByISBN: findBookByISBN,
  findBooksByTitle: findBooksByTitle,
  findBooksByAuthor: findBooksByAuthor,
  findBooksByPublisher: findBooksByPublisher
};