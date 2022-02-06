const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // parse jwtToken
    const jwtToken = req.header("token");

    // check if jwtToken exists
    if (!jwtToken) {
      return res.status(403).json("Not authorized");
    }
    // validate the token
    // upon validation it will return a payload
    const payload = jwt.verify(jwtToken, process.env.JWTSECRET);

    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not authorized");
  }
};
