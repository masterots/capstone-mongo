require("babel-polyfill");

async function findBookByISBN(db, ISBN, explain) {
  try {
    let book = await db.collection('books')
                        .findOne({'ISBN': ISBN});
    return book || {};
  }
  catch (e) {
    throw e;
  }
}

async function findBookByISBNExplained(db, ISBN, explain) {
  try {
    let book =await db.collection('books')
                      .find({'ISBN': ISBN}).explain();
    return book || {};

  }
  catch (e) {
    throw e;
  }
}

async function findBooksByTitle(db, title) {
  try {
    let books = await db.collection('books')
                        .find({'title': title}).sort({'title': 1});
    return books ? books.toArray() : [];
  }
  catch (e) {
    throw e;
  }
}

async function findBooksByAuthor(db, authorName) {
  try {
    let books = await db.collection('books')
                        .find({$text: {$search: authorName}}).sort({'title': 1});
    return books ? books.toArray() : [];
  }
  catch (e) {
    throw e;
  }
}

async function findBooksByPublisher(db, publisherName) {
  try {
    let books = await db.collection('books')
                        .find({'publisherName': publisherName}).sort({'title': 1});
    return books ? books.toArray() : [];
  }
  catch (e) {
    throw e;
  }
}

module.exports = {
  findBookByISBN: findBookByISBN,
  findBookByISBNExplained: findBookByISBNExplained,
  findBooksByTitle: findBooksByTitle,
  findBooksByAuthor: findBooksByAuthor,
  findBooksByPublisher: findBooksByPublisher
};