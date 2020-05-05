/** @format */

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No access token found - authorisation denied' });
  }

  // Verify token
  try {
    // Decode token through JWT
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Set user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Access token is not valid' });
  }
};
