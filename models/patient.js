const { string } = require('joi');
const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const patientSchema=new Schema({

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
    nic:{
        type:String,
        required:true,
        unique:true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
    },
    report: [
        {
            url:String,
            filename:String,
            reportType:String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    password:{
        type: String,
        required:true,
        default: function() {
            // Set the default password to the NIC number
            return this.nic;
        }
    }
})



module.exports=mongoose.model('Patient',patientSchema);