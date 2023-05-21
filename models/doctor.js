const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const doctorSchema=new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nic:{
        type:String,
        required:true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    contactNumber: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    address: {
        number:Number,
        street: String,
        city: String,
        state: String,
        postalCode: Number,
    },
   
    medicalLicenseNumber:{
        type: String,
        required:true
    }
    //There are more dateils to get 
})

module.exports=mongoose.model('Doctor',doctorSchema);