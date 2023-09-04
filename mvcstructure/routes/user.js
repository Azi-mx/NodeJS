const express = require('express');
const router  = new express.Router();
const {getDashboard, getForm,getPostdata,checkLoginData,Otpgen,otpverify,changePass} = require('../controller/usercontroll');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended:false})


//To render the forget form 
router.get('/forgotpass',(req,res)=>{
    res.render('forgotform')
})
//Here we are generating the otp and sending it through nodemailer
router.post('/otp',bodyParser,Otpgen)

router.get('/admin/data',getDashboard)
router.get('/admin/form',getForm) 
router.post('/admin/savedata',bodyParser,getPostdata)
// router.post('/checkLogin',bodyParser,checkUserData)
router.post('/checkLogin',bodyParser,checkLoginData)
router.post('/otpverify',bodyParser,otpverify)
router.post('/changePass',bodyParser,changePass)




module.exports = router;