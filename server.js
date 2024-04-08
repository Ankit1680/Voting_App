const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const db = require("./db");
const passport = require("./auth");
const PORT = process.env.PORT;

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session:false}) ;


// IMPORT routes
app.get("/", function (req, res) {
  res.send("Voting app");
});

const userRoute = require("./routes/UserRoutes");
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
