/* LEARN EXPRESS IN 35 MINS
https://www.youtube.com/watch?v=SccSCuHhOw0
*/

const express = require("express");
const app = express();

console.log("READY");

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  console.log("Here");
  // res.send('Hi'); // generic response

  // res.sendStatus(500) // sending status codes

  // res.status(500).send('Hi') // sending status code with chained message

  // res.status(500).json({ message: "Error"}) // sending down json; more common

  // res.json({ message: "Error"}) // sending json while status is successful (200 level)

  // res.download('server.js') // sending downloadable file

  res.render("index", { text: "world"}); // rendering file; sometimes you will have to render html files
});

app.listen(3000);
