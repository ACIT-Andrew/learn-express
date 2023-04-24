/* LEARN EXPRESS IN 35 MINS
https://www.youtube.com/watch?v=SccSCuHhOw0
*/

const express = require("express");
const app = express();

console.log("READY");

app.set("view engine", "ejs");
app.use(logger) 
/* 
This uses the middleware function "logger" declared below.
Because it's called at the top, it applies to all requests.
It can be called on individual requests as well, like in the .get request below.
 */

app.get("/", logger, (req, res) => {
  console.log("Homepage");
  // res.send('Hi'); // generic response

  // res.sendStatus(500) // sending status codes

  // res.status(500).send('Hi') // sending status code with chained message

  // res.status(500).json({ message: "Error"}) // sending down json; more common

  // res.json({ message: "Error"}) // sending json while status is successful (200 level)

  // res.download('server.js') // sending downloadable file

  res.render("index", { text: "world"}); // rendering file; sometimes you will have to render html files
});

const userRouter = require('./routes/users') // import the routes from user.js  

app.use('/users', userRouter) // links the routes from users.js into this main app file. "/users" is where we mount the "userRouter"


//// MIDDLEWARE ////
/* Middleware are functions that run between a client request and its server response.
router.param() is one example of middleware.
*/

function logger(req, res, next){
  // next is usually only used in middleware functions
  console.log(req.originalUrl);
  next()
}

app.listen(3000);
