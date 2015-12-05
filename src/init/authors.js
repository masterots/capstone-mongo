import {Author} from '../schemas/author';
import Chance from 'chance';
var chance = new Chance(12345);

function createAuthors() {
  var authors = [];

  for (var i = 0; i < 10; i++) {
    var author = new Author({
      name: chance.name(),
      age: chance.age(),
      birthCountry: chance.country()
    });
    authors.push(author);
  }
  return authors;
}

module.exports = {
  createAuthors: createAuthors
};