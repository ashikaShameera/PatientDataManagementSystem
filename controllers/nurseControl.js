const Nurse = require('../models/nurse')
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.registerNurse=async(req,res)=>{
  try {
    const nurse=new Nurse(req.body.nurse); 
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(nurse.password, saltRounds);
    nurse.password = hashedPassword   
    const user = new User({
       email: nurse.email,
       password: nurse.password,
       role: "Nurse",
       profile: nurse._id
     });       
    await user.save()     
    await nurse.save();      
    res.redirect(`/admin/nurse`);
    
  } catch (error) {
    if (error.code === 11000) {
      // This error code (11000) indicates a duplicate key error
      // Handle the duplicate email or NIC error here
      res.status(400).render('admin/nurse/nurse', { nurses:null,
          error: 'Email or NIC is already in use. Please choose a different one.',
      });
      
  } else {
      // Handle other errors (e.g., validation errors)
      console.error('Error during registration:', error);
      res.status(500).render('error', { error: 'Registration failed' });
  }
  }
     
 }

 module.exports.updateNurse = async (req, res) => {
   const { id } = req.params;
   const nurse = await Nurse.findByIdAndUpdate(id, { ...req.body.nurse });
   await nurse.save();
   res.redirect(`/nurse/${nurse.id}`);
 }