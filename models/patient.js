const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const patientSchema=new Schema({
    //attribues
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    medicalHistory: {
        allergies: [String],
        conditions: [String],
        medications: [String]
    },
    emergencyContact:{
        EmgName:String,
        EmgRelationship:String,
        EmgContactNumber:String
    }

})



module.exports=mongoose.model('Patient',patientSchema);