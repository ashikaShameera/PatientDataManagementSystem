// authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyAuthToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.redirect('/login'); // Redirect to the login page if the token is missing
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Verify the JWT token
    req.user = decoded; // Attach the user ID to the request object for future use
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.clearCookie('authToken')
    res.redirect('/login');
  }
};

module.exports = verifyAuthToken