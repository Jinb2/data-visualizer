const express = require("express");
const router = express.Router();
const pool = require("../../lib/db/db");
const bcrypt = require("bcrypt");

// register user
router.post("/", async (req, res) => {
  try {
    // parse req.body (name, password, email)
    const { name, password, email } = req.body;

    // check that user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // user already exists
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
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

    res.json(newUser.rows[0]);

    // generate our jwt token
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
