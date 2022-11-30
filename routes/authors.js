// Each route will have a view folder with all of their relevant views

const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All authors route
// Used to display this route
// The single / is what the route will be prepended with ("author will come before this)")
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    // Rendering this view (EJS File) into the authors route
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New Author route, used to display
router.get("/new", (req, res) => {
  // Rendering this view (EJS File) into the authors route
  res.render("authors/new", { author: new Author() });
});

// Create Author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect("/authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = router;
