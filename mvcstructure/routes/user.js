const express = require('express');
const passport = require('passport')

const router = new express.Router();
const { getDashboard, getForm, getPostdata, checkLoginData, Otpgen, otpverify, changePass, } = require('../controller/usercontroll');
const {savecat,delcat,showcat,editcat} = require('../controller/catcontroller')
const {savesubcat,getsubcatform,editsubcat,updatesubcat,delsubcat,getData,getFilteredData} = require('../controller/subcatcontroller')
const body = require('body-parser');
const bodyParser = body.urlencoded({ extended: false })



//To render the forget form 
router.get('/forgotpass', (req, res) => {
    res.render('forgotform')
})
//Here we are generating the otp and sending it through nodemailer
router.post('/otp', bodyParser, Otpgen)

router.get('/admin/data', getDashboard)
router.get('/admin/form', getForm)
router.post('/admin/savedata', bodyParser, getPostdata)
// router.post('/checkLogin',bodyParser,checkUserData)
// router.post('/checkLogin',bodyParser,checkLoginData)

router.post(
  "/checkLogin",
  passport.authenticate("local", {
    successRedirect: "/admin/data",
    failureRedirect: "/test",
  }),
  
   async (req, res) => {
    console.log(req.body)
    res.send("done");
  }
);
// router.post('/checkLogin', passport.authenticate('local', {
//     successRedirect: '/admin/data',
//     failureRedirect: '/',
//     failureFlash: true // This option enables flash messages for authentication failures
//   }));
  

router.post('/otpverify', bodyParser, otpverify)
router.post('/changePass', bodyParser, changePass)

router.post('/savecat', bodyParser,savecat)
router.get('/delcat/:id',delcat)
router.get('/editcat/:id',showcat)
router.post('/edittcat/:id',bodyParser,editcat)

//Subcat:
router.post('/savesubcat',bodyParser,savesubcat)
// router.get('/showsubcat',getsubdata)
router.get('/admin/subcatform',getsubcatform)
router.get('/showsubcat/:id',editsubcat)
router.post('/updatesubcat/:id',updatesubcat)
router.get('/deletesubcat/:id',delsubcat)
router.get('/getData',getData)
router.get('/getFilteredData',getFilteredData)
module.exports = router;