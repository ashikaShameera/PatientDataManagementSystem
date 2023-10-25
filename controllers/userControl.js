const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the common User model
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')
const Nurse = require('../models/nurse')
const Insurer = require('../models/insurer')
const Pharmacist = require('../models/pharmacist')

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
    const token = jwt.sign({ userId: user.profile._id }, 'your-secret-key', { expiresIn: '1h' });
    // Set the token as a cookie
    res.cookie('authToken', token, { httpOnly: true });

    // Redirect to profile page based on user's role
    if (user.role === 'Patient') {
      res.redirect(`/patient/${user.profile._id}`);
    } else if (user.role === 'Doctor') {
      res.redirect(`/doctor/${user.profile._id}`);
    } else if(user.role==='Admin') {
      res.redirect(`/admin/`);
    }else if(user.role==='Pharmacist') {
      res.redirect(`/pharmacist/${user.profile._id}`);
    }else if(user.role==='Nurse') {
      res.redirect(`/nurse/${user.profile._id}`);
    }else if(user.role==='Insurer') {
      res.redirect(`/insurer/${user.profile._id}`);
    }else {
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

const renderResetPassword = (req,res) => {
  res.render('users/reset-password',{error: null})
}

const handleResetPassword = async (req, res) => {
  const { email, currentPassword,newPassword } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.render('users/reset-password', { error: 'Invalid email or password' });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.render('users/reset-password', { error: 'Invalid email or password' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Redirect to profile page based on user's role
    if (user.role === 'Patient') {
      const patient = await Patient.findById(user.profile._id)
      patient.password = hashedPassword
      await patient.save()
      res.redirect(`/patient/${user.profile._id}`);
    } else if (user.role === 'Doctor') {
      const doctor = await Doctor.findById(user.profile._id)
      doctor.password = hashedPassword
      await doctor.save()
      res.redirect(`/doctor/${user.profile._id}`);
    } else if (user.role === 'Pharmarcist') {
      const pharmacist = await Pharmacist.findById(user.profile._id)
      pharmacist.password = hashedPassword
      await pharmacist.save()
      res.redirect(`/nurse/${user.profile._id}`)
    }else if (user.role === 'Nurse') {
      const nurse = await Nurse.findById(user.profile._id)
      nurse.password = hashedPassword
      await nurse.save()
      res.redirect(`/nurse/${user.profile._id}`)
    }else if (user.role === 'Insurer') {
      const insurer = await Insurer.findById(user.profile._id)
      insurer.password = hashedPassword
      await insurer.save()
      res.redirect(`/insurer/${user.profile._id}`)
    }else {
      // Handle other roles as needed
    }
  } catch (error) {
    console.error(error);
    res.render('user/reset-password', { error: 'An error occurred' });
  }
};

module.exports = {
  handleLogin,
  renderLogin,
  handleLogout,
  renderResetPassword,
  handleResetPassword
};
