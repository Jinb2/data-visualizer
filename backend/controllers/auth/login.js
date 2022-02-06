const express = require("express");
const pool = require("../../lib/db/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../middlewares/jwtGenerator");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("email").isEmail().withMessage("Email address is incorrect!"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password has to be at least 5 characters long!"),
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
    try {
      // parse req.body
      const { email, password } = req.body;

      // verify user exists
      const user = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );

      if (user.rows.length == 0) {
        return res.status(401).json("Password or email is incorrect!");
      }

      // verify password (boolean)
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );

      if (!validPassword) {
        return res.status(401).json("Password or email is incorrect");
      }

      // generate jwt token for user
      const token = await jwtGenerator(user.rows[0].user_id);

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
