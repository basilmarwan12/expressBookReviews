const express = require("express");
let books = require("./booksdb.js");
let promises = require('./promises.js')
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.send("Check Fields !!");
  }
  let checkUser = users.filter((user) => user["email"] === email);
  if (checkUser.length > 0) {
    res.send("User already exists");
  } else {
    users.push({ email: email, password: password });
    res.send().json({ message: "Registered Successfully !" });
  }
});

public_users.get("/", function (req, res) {
  res.json({ Books: books });
});

// using promise
public_users.get("/", function (req, res) {
  promises.getBooksByPromise()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

public_users.get("/isbn/:isbn", function (req, res) {
  const isbnValue = req.params.isbn;
  let currentBook = books[isbnValue];
  if (currentBook) {
    res.json({ book: currentBook });
  } else {
    res.send("Book Doesn't exist !");
  }
});

public_users.get("/isbn/:isbn", function (req, res) {
  let isbnValue = req.params.isbn;
  let currentBook = books[isbnValue];
  getBooksIsbn(currentBook)
    .then((response) => res.json({ book: response }))
    .catch((error) => res.status(500).send(error));
});



public_users.get("/author/:author", function (req, res) {
  const bookAuthor = req.params.author;
  for (let currentBook in books) {
    if (books[currentBook]["author"] === bookAuthor) {
      res.send(JSON.stringify(books[currentBook], null, 4));
    }
  }
  res.send("Book not fojund !");
});

public_users.get("/title/:title", function (req, res) {
  const bookTitle = req.params.title;
  for (let currentBook in books) {
    if (books[currentBook]["title"] === bookTitle) {
      res.send(JSON.stringify(books[currentBook], null, 4));
    }
  }
  res.send("Book not found !");
});

public_users.get("/review/:isbn", function (req, res) {
  const isbnValue = req.params.isbn;
  let currentBook = books[isbnValue];
  if (currentBook) {
    res.send(JSON.stringify(currentBook["reviews"], null, 4));
  } else {
    res.send("Book Doesn't exist !");
  }
});

module.exports.general = public_users;
