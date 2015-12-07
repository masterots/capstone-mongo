# Capstone project for HudlU Mongo

## Prerequisites
    node
    mocha
    mongo (remote server is fine)

## Steps
clone
npm install
update `database-config.json` mongo urls

## Commands
### npm run build
will compile source files. Compiled source is checked in, this step is not necessary to run project without changes.

### npm run generate
Adds data to your prod database. Currently set to add 500K documents to the books collection.
Must run `npm run build` if changing number of documents generated.

### npm test
Generates test data and runs tests.

### npm start
Will run web server at `http://localhost:3000`
URLS:

#### `/books/isbn`
add `?isbn=<isbn number>` to search for a book by isbn

#### `/books/isbnexplain`
add `?isbn=<isbn number>` to search for a book by isbn.
returns mongo's `explain` results

#### `/books/author`
add `?author=<author>` to search for a book by author. accepts partial name

#### `/books/publisher`
add `?publisher=<publisher>` to search for a book by publisher. accepts partial name

#### `/books/title`
add `?title=<title>` to search for a book by title. accepts partial title

#### `/reports/countBooksReleasedPerYear`

#### `/reports/countBooksReleasedPerYearPerPublisher`

#### `/reports/booksByAuthor`

#### `/reports/avgNumAuthorsPerBookPerYear`

## Additional info
`ISBN-Search-No-Index.json` and `ISBN-Search-Index.json` show the massive improvement in text search by ISBN over 500K documents
when an index is added. I wasn't "seeing" any performance issues with my eyes, but the numbers absolutely speak for the improvements
a simple index adds to a database.

I did spend time attempting to get "corrupted" data working in my reports, but ultimately didn't feel like it was prudent to spend
any more time on it without teammates. I had tried putting a date as a string on a book, and then convert it at aggregation time,
but I was getting bad dates out of it. I'd like to spend more time investigating it, outside of this project.