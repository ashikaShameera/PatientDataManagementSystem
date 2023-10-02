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
        required:true,
        unique:true
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
    },
    specialization:{
        type:String,
        enum:[
            'Internal Medicine',
            'Family Medicine',
            'Pediatrics',
            'Obstetrics and Gynecology',
            'General Surgery',
            'Anesthesiology',
            'Psychiatry',
            'Orthopedic Surgery',
            'Cardiology',
            'Dermatology'
          ],
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    university:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required :true,
        default: function() {
            // Set the default password to the NIC number
            return this.nic;
        }
    }
    //There are more dateils to get 
})

module.exports=mongoose.model('Doctor',doctorSchema);