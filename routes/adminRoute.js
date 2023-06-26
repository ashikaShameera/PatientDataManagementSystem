const express = require('express');
const router = express.Router();

const adminControl=require('../controllers/adminControl');
const catchAsync=require('../utils/catchAsync');

router.route('/:id')
    .get(adminControl.renderAdminHomePage)  //must handle async error handler

module.exports=router;