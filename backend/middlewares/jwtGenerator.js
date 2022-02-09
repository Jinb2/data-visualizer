const jwt = require("jsonwebtoken");

// creates our jwt for authentication
function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  // return the token
  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
