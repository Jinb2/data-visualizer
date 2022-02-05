const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.js"));

router.get("/", (req, res) => {
  res.send({ payload: "test!" });
});

module.exports = router;
