const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the common User model

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.render('users/login', { error: 'Invalid email or password' });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('users/login', { error: 'Invalid email or password' });
    }

    // If authentication is successful, create a JWT token
    const token = jwt.sign({ userId: user.profile._id }, 'your-secret-key', { expiresIn: '5s' });
    // Set the token as a cookie
    res.cookie('authToken', token, { httpOnly: true });

    // Redirect to profile page based on user's role
    if (user.role === 'Patient') {
      res.redirect(`/patient/${user.profile._id}`);
    } else if (user.role === 'Doctor') {
      res.redirect(`/doctor/${user._id}`);
    } else {
      // Handle other roles as needed
    }
  } catch (error) {
    console.error(error);
    res.render('user/login', { error: 'An error occurred during login' });
  }
};

const renderLogin = (req, res) => {
  res.render('users/login', { error: null });
};

const handleLogout = (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/login'); // Redirect to the login page after logout
};

module.exports = {
  handleLogin,
  renderLogin,
  handleLogout
};
