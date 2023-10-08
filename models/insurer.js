const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const insurerSchema=new Schema({
    companyName: {
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
   
    iic:{
        type: String,
        required:true,
        unique:true
    },
    contactNumber: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required :true,
        default: function() {
            // Set the default password to the NIC number
            return this.iic;
        }
    }
    //There are more dateils to get 
})

module.exports=mongoose.model('Insurer',insurerSchema);