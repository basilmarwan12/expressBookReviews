const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  if (username.length > 0) {
    return true;
  }
  return false;
};

const authenticatedUser = (username, password) => {
  let checkUser = users.filter(
    (user) => user["email"] === username && user["password"] === password
  );

  if (checkUser.length > 0) {
    return true;
  }
  return false;
};

regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!isValid(username)) {
    res.status(203).send("Check Credentials");
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: { username: username },
      },
      "access",
      { expiresIn: 60 * 10 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    res.status(200).send("User has successfully logged in!");
  } else {
    res.status(203).send("Login Failed");
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let currentUser = req.session.authorization["username"];
  let currentBook = books[req.params.isbn];
  if (!currentBook) {
    return res.status(404).send("Book not found");
  }
  let currentBookReviews = currentBook.reviews;
  let bookReview = req.body.review;
  currentBookReviews[currentUser] = bookReview;
  res.status(200).send(
    `Book Review hass been added 
      `
  );
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let currentIsbn = req.params.isbn;
  let currentBook = books[currentIsbn];
  if (!currentBook) {
    res.send("Book not found !");
  }
  let currentUser = req.session.authorization["username"];
  delete currentBook["reviews"][currentUser];
  res.send("Deleted Successfully")
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
