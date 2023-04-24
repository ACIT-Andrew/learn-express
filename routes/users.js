const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // e.g. get request from client. send response: "User List"
  console.log(req.query.name); // req.query gets query parameter
  res.send("User List");
});

//// Learn form parsing/JSON data here. ////
router.get("/new", (req, res) => {
  //   res.send("User New Form");
  res.render("users/new", { firstName: "Test" });
});

/* 
Make sure you always put your static routes (e.g. "/new")
above dynamic routes (e.g. "/:id"), because if you don't the static url parameter will be used by the dynamic route first.
"new" will register as an ":id" in this case.
*/

router.post("/", (req, res) => {
  // e.g. post request for creating user
  // Here is a mock validation process : 
  const isValid = true;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", { firstName: req.body.firstName });
  }
//   console.log(req.body.firstName);
//   res.send("Create User");
});

//// Let's work with dynamic urls/routes. ////
// router.get("/:id", (req, res) => {
//   // dynamic route parameter ":id"
//   res.send(`Get User with ID ${req.params.id}`);
// });
// router.put("/:id", (req, res) => {
//   // dynamic route parameter ":id"
//   res.send(`Get User with ID ${req.params.id}`);
// });
// router.delete("/:id", (req, res) => {
//   // dynamic route parameter ":id"
//   res.send(`Get User with ID ${req.params.id}`);
// });

//// router.route chains requests to one route. This does the same thing as code above. ////
router
  .route("/:id")
  .get((req, res) => {
    // dynamic route parameter ":id"
    // console.log(req.user);
    res.send(`Get User with ID ${req.params.id}`);
  })
  .put((req, res) => {
    // dynamic route parameter ":id"
    res.send(`Update User with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    // dynamic route parameter ":id"
    res.send(`Delete User with ID ${req.params.id}`);
  });

//// MIDDLEWARE ////
/* Middleware are functions that run between a client request and its server response. They are run before any request functions are executed.
router.param() is one example of middleware.
*/

const users = [{ name: "Alex" }, { name: "Mario" }];
router.param("id", (req, res, next, id) => {
  // router.param runs code whenever url param matches
  // next argument is a function that passes control onto next middleware function in the chain.
  console.log(id);
  req.user = users[id]; // Assign request for /user as a users array item, using id parameter
  next();
});

module.exports = router;
