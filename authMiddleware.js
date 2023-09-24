// authMiddleware.js

const jwt = require('jsonwebtoken');

// Define the middleware function
function verifyToken(req, res, next) {
  const token = req.cookies.authToken; // Assuming you named the cookie 'authToken'

  if (!token) {
    // Redirect or respond with an error if no token is present
    return res.redirect('/login'); // Redirect to the login page or handle it differently
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      // Redirect or respond with an error if the token is invalid
      return res.redirect('/login'); // Redirect to the login page or handle it differently
    }

    // If the token is valid, you can access the user's ID as decoded.userId
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken; // Export the middleware function directly
