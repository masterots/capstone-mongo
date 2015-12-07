require("babel-polyfill");

async function countBooksReleasedPerYear(db) {
  try {
    let results = await db.collection('books').aggregate([{
      $group: {
        _id: {
          $year: "$releaseDate"
        },
        count: {
          $sum: 1
        }
      },
    },{
      $sort: {
        _id: 1
      }
    }]).toArray();
    return results;
  }
  catch (e) {
    throw e;
  }
}

async function countBooksReleasedPerYearPerPublisher(db) {
  try {
    let results = await db.collection('books').aggregate([{
      $group: {
        _id: {
          PublisherName: "$publisherName",
          year: {
            $year: "$releaseDate"
          }
        },
        count: {
          $sum: 1
        }
      }
    },{
      $group: {
        _id: "$_id.PublisherName",
        books: {
          $push: {
            year: "$_id.year",
            count: "$count"
          }
        }
      }
    },{
      $sort: {
        PublisherName: 1
      }
    },{
      $project: {
         _id: 0,
         publisher:  "$_id",
         books: 1
      }
    }]).toArray();
    return results;
  }
  catch (e) {
    throw e;
  }
}

async function booksByAuthor(db) {
  try {
    let results = db.collection('books').aggregate([{
      $unwind: "$authors"
    },{
      $group: {
        _id: "$authors.name",
        books: {
          $push: {
            title: "$title".toString(),
            isbn: "$ISBN"
          }
        }
      }
    }]).toArray();
    return results;
  }
  catch(e) {
    throw e;
  }
}

async function avgNumAuthorsPerBookPerYear(db) {
  //Average number of authors per book per year
  try {
    let results = db.collection('books').aggregate([{
      $group: {
        _id: {
          year: {
            $year: "$releaseDate"
          },
          numAuthors: {
            $size: "$authors"
          }
        }
      }
    },{
      $group: {
        _id: "$_id.year",
        avgNumAuthorsPerBook: {
          $avg: "$_id.numAuthors"
        }
      }
    },{
      $sort: { _id: 1 }
    },{
      $project: {
        _id: 0,
        year:  "$_id",
        avgNumAuthorsPerBook: 1
      }
    }]).toArray();
    return results;
  }
  catch(e) {
    throw e;
  }
}

module.exports = {
  countBooksReleasedPerYear: countBooksReleasedPerYear,
  countBooksReleasedPerYearPerPublisher: countBooksReleasedPerYearPerPublisher,
  booksByAuthor: booksByAuthor,
  avgNumAuthorsPerBookPerYear: avgNumAuthorsPerBookPerYear
};

