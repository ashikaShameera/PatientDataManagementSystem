const express = require('express');
const router = express.Router();
const multer  = require('multer')
const {storage}=require('../cloudinary')
const upload = multer({ storage }) //used to upload files

const reportController=require('../controllers/reportController');

const catchAsync=require('../utils/catchAsync');

router.route('/')
    .post( upload.single('reportFile'),reportController.uploadReport)
        


module.exports=router 