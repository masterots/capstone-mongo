'use strict';

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chance = new _chance2.default(12345);

function createAuthors() {
  var authors = [];

  for (var i = 0; i < 10; i++) {
    var author = {
      name: chance.name(),
      age: chance.age(),
      birthCountry: chance.country()
    };
    authors.push(author);
  }
  return authors;
}

module.exports = {
  createAuthors: createAuthors
};