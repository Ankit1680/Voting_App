const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

// SIGNUP
router.post("/signUp", async (req, res) => {
  try {
    //request body contains all the user data
    const data = req.body;

    // create a new user to the database
    const newUser = new User(data);

    // save the new user to the database
    const response = await newUser.save();
    console.log("data saved success");

    //JWT token create
    const payload = {
      id: response.id,
      username: response.name,
    };
    const token = generateToken(payload);
    console.log("token is :", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // Take username and password from the request body
    const { aadharCard, password } = req.body;

    // Find the user by username from the database
    const user = await Person.findOne({ aadharCard: aadharCard });

    // If user does not exist or password is invalid
    if (!user || !(await user.comparePassword(password))) {
      console.log("Invalid username or password");
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    // Generate token
    const payload = {
      id: user.id,
      username: user.name,
    };

    const token = generateToken(payload);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//PROFILE route
router.get("/profile", async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;

    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});

// PASSWORD
router.put("/profile/password", async (req, res) => {
  try {
    //Extract userId from token
    const userId = req.user.id;

    //Extract current and new password from req body
    const { currentPassword, newPassword } = req.body;

    // Find the user by userId from the database
    const user = await User.findOne(userId);

    // If user does not exist or password is invalid
    if (!(await user.comparePassword(password))) {
      console.log("Invalid username or password");
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    user.password = newPassword;
    await user.save();

    console.log("password change success");
    res.status(200).json({ msg: "Password changed success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});

// parameterized API
router.get("/:workType", async (req, res) => {
  try {
    //fetch the param from req.params
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("person fetch success...");
      res.status(200).json(response);
    } else {
      res.status(404).json({ err: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server eeror" });
  }
});

module.exports = router;
