import Chance from 'chance';
import _ from 'lodash';

var chance = new Chance(12345);

async function cleanBooks(db) {
  return await db.collection('books').remove({});
}

async function dropIndexes(db) {
  return await db.collection('books').dropIndexes();
}

async function createBooks(db, authors) {
  await cleanBooks(db);
  await dropIndexes(db);
  var max = 9;
  var min = 1;
  var numBooksToMake = 100;
  var numTimesToMakeBooks = 5000;

  var publishers = [];
  for (var i = 0; i < 8; i++) {
    publishers.push(chance.last())
  }
  try {
    var books = [];
    for (var outer = 0; outer < numTimesToMakeBooks; outer++) {
      for (var i = 0; i < numBooksToMake; i++) {
        var selectedAuthors = _.sample(authors, _.random(min, max));
        var year = chance.integer({min: 1999, max: 2014});
        var book = {
          title: chance.sentence({words: 5}),
          authors: selectedAuthors,
          ISBN: chance.string({pool: '1234567890-', length: 13}),
          releaseDate: chance.date({year: year}),
          firstPublishCountry: chance.country(),
          publisherName: _.sample(publishers),
          description: chance.paragraph({sentences: 2})
        };
        books.push(book);
      }
      console.log(`${numBooksToMake} books created`);
      await db.collection('books').insertMany(books);
      db.collection('books').createIndex({
                             'title': 'text',
                             'authors.name': 'text',
                             'publisherName': 'text'
                           });
      db.collection('books').createIndex({
                             'ISBN': 1
                           });
      console.log(`${numBooksToMake} books saved: loop #${outer}`);
      books = [];
    }
    return;
  }
  catch(e) {
    console.log('createBooks blew up', e);
    process.exit(1);
  }
}

module.exports = {
  createBooks: createBooks
};