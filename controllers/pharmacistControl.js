const Pharmacist = require('../models/pharmacist')
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.registerPharmarcist=async(req,res)=>{
    const pharmacist=new Pharmacist(req.body.pharmacist); 
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(pharmacist.password, saltRounds);
    pharmacist.password = hashedPassword
    await pharmacist.save();   
    const user = new User({
       email: pharmacist.email,
       password: pharmacist.password,
       role: "Pharmacist",
       profile: pharmacist._id
     });       
    await user.save()           
    res.redirect(`/admin/pharmacist`);
    //need to add flash msg 
 }