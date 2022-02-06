const express = require("express");
const router = express.Router();

// routers for login register and verifying
router.use("/login", require("./auth/login"));
router.use("/register", require("./auth/register"));
router.use("/is-verify", require("./auth/verify"));

module.exports = router;
