require("babel-polyfill");

import mongoose from 'mongoose';
import {Author} from '../schemas/author';
import {Book} from '../schemas/book';

mongoose.connect('mongodb://localhost/capstone-mongo-test-data');
let db = mongoose.connection;

async function cleanBooks() {
  return await Book.remove({});
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  try {
    await cleanBooks();

    let authors = [];
    let authorOne = new Author({
      name: 'Tom Clancy',
      age: 32,
      birthCountry: 'US'
    });
    authors.push(authorOne);
    let authorTwo = new Author({
      name: 'Stephen King',
      age: 65,
      birthCountry: 'US'
    });
    authors.push(authorTwo);

    let books = [];
    let bookOne = new Book({
      title: 'The Dark Tower: The Gunslinger',
      authors: authors[1],
      ISBN: '978-0-937986-50-9',
      releaseDate: '1982-06-10',
      firstPublishCountry: 'US',
      publisherName: 'Grant',
      description: 'The book tells the story of The Gunslinger, Roland of Gilead, and his quest to catch the man in black, the first of many steps towards Roland\'s ultimate destination: The Dark Tower.'
    });
    books.push(bookOne);
    let bookTwo = new Book({
      title: 'Rainbow Six',
      authors: authors[0],
      ISBN: '0-399-14390-4',
      releaseDate: '1998-08-01',
      firstPublishCountry: 'US',
      publisherName: 'G. P. Putnam\'s Sons',
      description: 'Central Intelligence Agency operative John Clark and Domingo Chavez join Special Air Service (SAS) officer Alistair Stanley in forming an elite multinational counter-terrorist unit known as Rainbow, based in Hereford, United Kingdom.'
    });
    books.push(bookTwo);
    let bookThree = new Book({
      title: 'The Tommyknockers',
      authors: authors,
      ISBN: '978-0-399-13314-5',
      releaseDate: '1987-11-10',
      firstPublishCountry: 'US',
      publisherName: 'Putnam',
      description: 'While walking in the woods near the small town of Haven, Maine, Roberta (Bobbi) Anderson, a writer of Wild West-themed fiction, stumbles upon a metal object that turns out to be a protrusion of a long-buried alien spacecraft.'
    });
    books.push(bookThree);
    books = await Book.create(books);

    console.log('good to go');
    process.exit(0);
  }
  catch (e) {
    console.log('main blew up', e);
    process.exit(1);
  }
});