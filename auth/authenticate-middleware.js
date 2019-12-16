const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = async (req, res, next) => {
  // get token from header
  const token = req.headers.authorization;

  if (token) {
    // Verify if token is valid
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // if verifaction fails
        res.status(401).json({
          message:
            "Cannot verify identity, Please Login in again or Sign up if you don't have an account",
        });
      } else {
        // If successful add jwt on request object to pass onto the next middlware function
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'You must be logged into access this' });
  }
};
