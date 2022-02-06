const express = require("express");
const router = express.Router();
const authorization = require("../../middlewares/authorization");

// verify jwt endpoint
router.get("/", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
