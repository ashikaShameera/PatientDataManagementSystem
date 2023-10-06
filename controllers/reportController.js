const Patient = require("../models/patient");

module.exports.uploadReport=async (req,res)=>{
        
        const patientId=req.body.patientId
        const doctorId=req.body.doctorId;
        
        try{
            const reportType=req.body.reportType;
            const path=req.file.path;
            const filename=req.file.filename;
    
            const patinet=await Patient.findById(patientId);
    
            patinet.report.push({
                url: path,
                filename: filename,
                reportType:reportType
            })
            
            const a=await patinet.save();
        }
        catch(error){
            console.log(error)
        }

        res.redirect(`/doctor/${doctorId}/patients/${patientId}`);
}