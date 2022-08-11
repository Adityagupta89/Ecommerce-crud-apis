const express=require('express');
const router=express.Router();
const mailController=require('../controllers/mail-controller')
router.post('/',mailController.mail)
module.exports=router