const express = require('express');
const app=express();
const path = require('path');
const ejsMate = require('ejs-mate');    //for boilerplate
const mongoose =require('mongoose');    //for database

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname, 'public'))) //this used for get css work


const patientRoute=require('./routes/patientRoute');
const doctorRoute=require('./routes/doctorRoute')

mongoose.connect('mongodb://localhost:27017/PatientDataManagementSystem', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    // useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.json())     //for parsing url encorded
app.use(express.urlencoded({ extended: true }));

app.use('/patient',patientRoute);   //Going to patient route
app.use('/doctor',doctorRoute);     //going to doctor route

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(8080,()=>{
    console.log("SERVING ON PORT 8080");
})

