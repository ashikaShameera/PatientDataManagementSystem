const Pharmacist = require('../models/pharmacist')
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.registerPharmarcist=async(req,res)=>{
    try {
    const pharmacist=new Pharmacist(req.body.pharmacist); 
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(pharmacist.password, saltRounds);
    pharmacist.password = hashedPassword   
    const user = new User({
       email: pharmacist.email,
       password: pharmacist.password,
       role: "Pharmacist",
       profile: pharmacist._id
     });       
    await user.save() 
    await pharmacist.save();          
    res.redirect(`/admin/pharmacist`);
  
    } catch (error) {
      if (error.code === 11000) {
         // This error code (11000) indicates a duplicate key error
         // Handle the duplicate email or NIC error here
         res.status(400).render('admin/pharmacist/pharmacist', { pharmacists:null,
             error: 'Email or NIC is already in use. Please choose a different one.',
         });
         
     } else {
         // Handle other errors (e.g., validation errors)
         console.error('Error during registration:', error);
         res.status(500).render('error', { error: 'Registration failed' });
     }
    }
     
 }