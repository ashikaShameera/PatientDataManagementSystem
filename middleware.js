const {patientSchema} =require('./schemas.js');
const ExpressError=require('./utils/ExpressError.js');


//This is validated patient data using joi
module.exports.isValidatePatient=(req,res,next)=>{
    console.log(req.body.patient)   //This will print patient obkect on the console
    const { error } = patientSchema.validate(req.body.patient);
    
    if(error){
        const msg =error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}