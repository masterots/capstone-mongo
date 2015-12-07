require("babel-polyfill");

import {MongoClient} from 'mongodb';
var config = require('../../database-config.json');
var url = config.test;

async function cleanBooks(db) {
  try {
    return await db.collection('books').deleteMany({});
  }
  catch(e) {
    console.log('could not clean data');
    throw e;
  }
}

async function dropIndexes(db) {
    try {
      return await db.collection('books').dropIndexes();
  }
  catch(e) {
    console.log('could not drop indexes');
    throw e;
  }
}


async function createData(db) {
  try {
    await cleanBooks(db);
      // await dropIndexes(db);

    let authors = [];
    let authorOne = {
      name: 'Tom Clancy',
      age: 32,
      birthCountry: 'US'
    };
    authors.push(authorOne);
    let authorTwo = {
      name: 'Stephen King',
      age: 65,
      birthCountry: 'US'
    };
    authors.push(authorTwo);

    let books = [];
    let bookOne = {
      title: 'The Dark Tower: The Gunslinger',
      authors: [ authors[1] ],
      ISBN: '978-0-937986-50-9',
      releaseDate: new Date(1982,6,10),
      firstPublishCountry: 'US',
      publisherName: 'Grant',
      description: 'The book tells the story of The Gunslinger, Roland of Gilead, and his quest to catch the man in black, the first of many steps towards Roland\'s ultimate destination: The Dark Tower.'
    };
    books.push(bookOne);
    let bookTwo = {
      title: 'Rainbow Six',
      authors: [ authors[0] ],
      ISBN: '0-399-14390-4',
      releaseDate: new Date(1998,8,1),
      firstPublishCountry: 'US',
      publisherName: 'G. P. Putnam\'s Sons',
      description: 'Central Intelligence Agency operative John Clark and Domingo Chavez join Special Air Service (SAS) officer Alistair Stanley in forming an elite multinational counter-terrorist unit known as Rainbow, based in Hereford, United Kingdom.'
    };
    books.push(bookTwo);
    let bookThree = {
      title: 'The Tommyknockers',
      authors: authors,
      ISBN: '978-0-399-13314-5',
      releaseDate: new Date(1987,11,10),
      firstPublishCountry: 'US',
      publisherName: 'Putnam',
      description: 'While walking in the woods near the small town of Haven, Maine, Roberta (Bobbi) Anderson, a writer of Wild West-themed fiction, stumbles upon a metal object that turns out to be a protrusion of a long-buried alien spacecraft.'
    };
    books.push(bookThree);
    books = await db.collection('books').insertMany(books);
    db.collection('books').createIndex({
                            'title': 'text',
                            'authors.name': 'text',
                            'publisherName': 'text'
                          });
    db.collection('books').createIndex({
                            'ISBN': 1
                          });
    // bookcount = await db.collection('books').find().count();
    return;
  }
  catch (e) {
    throw e;
  }
}

MongoClient.connect(url)
  .then(async function(conn) {
    try {
      let books = await createData(conn);
      // console.log('good to go');
      process.exit(0);
    }
    catch (e) {
      console.log('main blew up', e);
      process.exit(1);
    }
  });