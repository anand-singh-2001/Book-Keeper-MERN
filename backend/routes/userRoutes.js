const express = require("express");
const User = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const JWT_SECRET = process.env.JWT_SECRET;
// console.log(JWT_SECRET);

const router = express.Router();
//Route 1:Create a user using POST"/api/auth/createUser": 1st endpoint. No login required.
router.post(
  "/createUser",
  [
    body("name", "Name must contain atleast 3 characters.").isLength({
      min: 3,
    }), //checks and validation messages
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if error is present display bad request and the errors:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ success, errors: errors.array() });
    }
    //Check whether user with the same email exists already:
    try {
      let user = await User.findOne({ email: req.body.email }); //checking if a user with the email address exists.
      if (user) {
        return res.status(400).send({
          success,
          error: "Sorry a user with same email already exists",
        });
      }
      // const secPass= req.body.password;
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); //adding hash and salt to the password.

      //Create a new user:
      user = await User.create({
        //returns a promise, therefore await is used
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // .then(user => res.send(user)).catch(err => {
      //     console.log(err), res.send({ error: 'Enter a unique value for email', message: err.message })

      // })
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //creates a token: takes an object and the secret variable/signature.
      success = true;
      res.send({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 2: Authenticate a user Login using credentials:2nd End-point. No loggin required.
router.post(
  "/login",
  [
    //checks and validation messages
    body("email", "Enter a valid email").isEmail(), //The first part is the value and the second part is the message to be displayed.
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if error is present display bad request and the errors:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); //Checking if a user with the entered credentials exists.
      if (!user) {
        return res
          .status(400)
          .send({ success, error: "Enter correct login credentials" });
      } //Returns error message.
      const passwordCompare = await bcrypt.compare(password, user.password); //compares the entered pasword with the users password and returns true or false.
      if (!passwordCompare) {
        //if user is not found i.e, credentials don't match
        return res
          .status(400)
          .send({ success, error: "Enter correct login credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET); //creates a token: takes an object and the secret variable/signature.
      success = true;
      res.send({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Get logged-in user data. Login required.
router.post("/getuser", fetchUser, async (req, res) => {
  //fetchuser is a middleware that is used/runs during login. The middleware runs before the async function.
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId).select("-password"); //Getting the user by id, except the password.
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
