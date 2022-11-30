//Specifying that the dotenv file will be used when running the app on our local server during development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Requiring dependencies needed for project

// USed to create server
const express = require("express");
const app = express();
// Used to create a layout that can saves on time and means less pages need to be made
const expressLayouts = require("express-ejs-layouts");
// Used for creating directory strings
const path = require("path");
// Used to parse data from HTML forms
const bodyParser = require("body-parser");

// Requiring exported variables from each of our routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

// Setting view engine as ejs as well as engine path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// setting layout path
app.set("layout", "layouts/layout");
app.use(expressLayouts);
// Declaring a public folder for style pages etc
app.use(express.static("public"));
// Using bodyParser
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Setting up mongoose server
const mongoose = require("mongoose");
// URL not hardcoded as this will change while app is being used. new URL parser added to ensure older deprecated version will not be active
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
// Display error if issue with connection
db.on("error", (error) => console.error(error));
// Display success message if connection is established
db.once("open", () => console.log("Connected to mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000);
