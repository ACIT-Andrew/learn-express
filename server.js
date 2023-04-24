/* LEARN EXPRESS IN 35 MINS
https://www.youtube.com/watch?v=SccSCuHhOw0
*/

const express = require("express");
const app = express();

console.log("READY");

app.use(express.static("public"));
/* 
This serves to the client all the files from "public" directory. 
Also denotes serving/rendering static files (html instead of ejs). 
*/
app.use(express.urlencoded({ extended: true}))
/* Boilerplate middleware .urlencoded() that allows us to access information from forms. */
app.use(express.json())
/* Allows json information from client body to be parsed. */

app.set("view engine", "ejs");
/* Set view engine using EJS. .ejs files in the "views" directory are then available for use.*/
app.use(logger);
/* 
This uses the middleware function "logger" declared below.
Because it's called at the top, it applies to all requests.
It can be called on individual requests as well, like in the .get request below.
*/

//// Implementing Other Routes into Main App ////
const userRouter = require("./routes/users"); // import the routes from user.js
app.use("/users", userRouter); // links the routes from users.js into this main app file. "/users" is where we mount the "userRouter"

app.get("/", logger, (req, res) => {
  // Handling get request for the main route (home).
  console.log("Homepage");
  // res.send('Hi'); // generic response

  // res.sendStatus(500) // sending status codes

  // res.status(500).send('Hi') // sending status code with chained message

  // res.status(500).json({ message: "Error"}) // sending down json; more common

  // res.json({ message: "Error"}) // sending json while status is successful (200 level)

  // res.download('server.js') // send downloadable file

  res.render("index", { text: "world" }); // rendering file; sometimes you will have to render html files
});


//// MIDDLEWARE ////
/* Middleware are functions that run between a client request and its server response.
router.param() is one example of middleware.
We also create our own middleware called "logger" below.
*/

function logger(req, res, next) {
  // next is usually only used in middleware functions
  console.log(req.originalUrl, "(this comes from 'logger' middleware function)");
  next();
}

app.listen(3000);
