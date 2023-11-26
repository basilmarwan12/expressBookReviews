let books = require("./booksdb");

function getBooksByPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = { books: books };
      resolve(response);
    }, 1000);
  });
}

function getBooksIsbn(currentBook) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (currentBook) {
          resolve(currentBook);
        } else {
          reject("Book not found");
        }
      },
      4000,
      null
    );
  });
}

function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        for (let currentBook in books) {
          if (books[currentBook]["author"] === author) {
            resolve(books[currentBook])
          }
        }
        reject("Book not Found !")
      },
      1000,
      null
    );
  });
}

function getBookByTitle(title) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          for (let currentBook in books) {
            if (books[currentBook]["title"] === title) {
              resolve(books[currentBook])
            }
          }
          reject("Book not Found !")
        },
        1000,
        null
      );
    });
  }


module.exports = {
  getBooksByPromise: getBooksByPromise,
  getBooksIsbn: getBooksIsbn,
  getBooksByAuthor:getBooksByAuthor,
  getBookByTitle:getBookByTitle
};
