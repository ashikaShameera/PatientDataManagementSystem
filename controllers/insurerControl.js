const Insurer = require('../models/insurer')
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.registerInsurer=async(req,res)=>{
   try {
   const insurer=new Insurer(req.body.insurer); 
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(insurer.password, saltRounds);
    insurer.password = hashedPassword  
    const user = new User({
       email: insurer.email,
       password: insurer.password,
       role: "Insurer",
       profile: insurer._id
     });       
    await user.save()    
    await insurer.save();        
    res.redirect(`/admin/insurer`);
    
   } catch (error) {
      if (error.code === 11000) {
         // This error code (11000) indicates a duplicate key error
         // Handle the duplicate email or NIC error here
         res.status(400).render('admin/insurer/insurer', { insurers:null,
             error: 'Email or IIC is already in use. Please choose a different one.',
         });
         
     } else {
         // Handle other errors (e.g., validation errors)
         console.error('Error during registration:', error);
         res.status(500).render('error', { error: 'Registration failed' });
     }
   }
     
 }