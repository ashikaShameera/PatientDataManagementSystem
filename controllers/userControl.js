const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/patient');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.render('users/login', { error: 'Invalid email or password' });
    }

    //Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('users/login', { error: 'Invalid email or password' });
    }
    // If authentication is successful, create a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key',{ expiresIn: '1h' });
    // Set the token as a cookie
    res.cookie('authToken', token, { httpOnly: true });
    // Redirect to profile page after successful login
    res.redirect(`/patient/${user._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'An error occurred during login' });
  }
};

const renderLogin = (req, res) => {
  res.render('users/login', { error: null });
};

const handleLogout = (req, res) => {
  res.clearCookie('authToken')
  res.redirect('/login'); // Redirect to the login page after logout
};

module.exports = {
  handleLogin,
  renderLogin,
  handleLogout
};
