const Insurer = require('../models/insurer')
const User = require('../models/user')
const bcrypt = require('bcrypt')


module.exports.registerInsurer=async(req,res)=>{
    const insurer=new Insurer(req.body.insurer); 
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(insurer.password, saltRounds);
    insurer.password = hashedPassword
    await insurer.save();   
    const user = new User({
       email: insurer.email,
       password: insurer.password,
       role: "Insurer",
       profile: insurer._id
     });       
    await user.save()           
    res.redirect(`/admin/insurer`);
    //need to add flash msg 
 }