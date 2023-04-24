const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User List");
});

router.get("/new", (req, res) => {
  res.send("User New Form");
});

router.post("/", (req, res) => {
  // e.g. post request for creating user
  res.send("Create User");
});

/* 
Make sure you always put your static routes (e.g. "/new")
above dynamic routes, because the static url parameter will be used by the dynamic route first.
/new will register as an ":id" in this case.
*/

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
    console.log(req.user);
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
/* Middleware are functions that run between a client request and its server response.
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
