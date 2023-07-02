const express = require('express');
const router = express.Router();

const userControl=require('../controllers/userControl');
const catchAsync=require('../utils/catchAsync');
//toDo

router.route('/login')
    .get(userControl.renderLogin)

module.exports=router