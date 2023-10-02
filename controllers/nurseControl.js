const Nurse = require('../models/nurse')
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.registerNurse=async(req,res)=>{
    const nurse=new Nurse(req.body.nurse); 
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(nurse.password, saltRounds);
    nurse.password = hashedPassword
    await nurse.save();   
    const user = new User({
       email: nurse.email,
       password: nurse.password,
       role: "Nurse",
       profile: nurse._id
     });       
    await user.save()           
    res.redirect(`/admin/nurse`);
    //need to add flash msg 
 }