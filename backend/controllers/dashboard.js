const express = require("express");
const pool = require("../lib/db/db");
const router = express.Router();
const authorization = require("../middlewares/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // get username associated with the jwt
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
