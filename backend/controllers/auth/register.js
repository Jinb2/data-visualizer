const express = require("express");
const router = express.Router();
const pool = require("../../lib/db/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../middlewares/jwtGenerator");
const { body, validationResult } = require("express-validator");

// register user
router.post(
  "/",
  body("email").isEmail().withMessage("Email address is incorrect!"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password has to be at least 5 characters long!"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name has to be at least 3 characters long!"),
  async (req, res) => {
    // Return validation errors
    const errors = validationResult(req);

    // append errors to message
    const errorMessage = {};
    for (let i = 0; i < errors.array().length; i++) {
      errorMessage[errors.array()[i]["param"]] = errors.array()[i]["msg"];
    }

    if (!errors.isEmpty()) {
      return res.status(400).json(errorMessage);
    }

    // try creating the user
    try {
      // parse req.body (name, password, email)
      const { name, password, email } = req.body;

      // check that user exists
      const user = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );

      // user already exists
      if (user.rows.length !== 0) {
        return res.status(401).json("User already exists");
      }

      // bcrypt the password
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      // insert user into database
      const newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );

      // generate our jwt token
      const token = jwtGenerator(newUser.rows[0].user_id);
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
