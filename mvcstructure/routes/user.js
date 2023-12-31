const express = require('express');
const passport = require('passport')
let userModel = require('../model/userModels')
let rolemodel = require('../model/role')
require('../model/googleauth')
const googleauthenticate = require('../model/googleauth')
const router = new express.Router();
const { getDashboard, getForm, getPostdata, checkLoginData, Otpgen, otpverify, changePass, registerForm } = require('../controller/usercontroll');
const { savecat, delcat, showcat, editcat } = require('../controller/catcontroller')
const { savesubcat, getsubcatform, editsubcat, updatesubcat, delsubcat, getData, getFilteredData } = require('../controller/subcatcontroller')
const { getproduct, saveproduct } = require('../controller/productcontroller')

const { roleData, saverole, deleteRoleData, editRoleData, updaterole, checkRole } = require('../controller/rolecontroller')
const getPDF = require('../controller/pdfcontroller')
const signupdetails = require('../controller/googlecontroller')
const body = require('body-parser');
const verifyToken = require('../jwtconfig');
const bodyParser = body.urlencoded({ extended: false })



//To render the forget form 
router.get('/forgotpass', (req, res) => {
    res.render('forgotform')
})
//Here we are generating the otp and sending it through nodemailer

//user
router.post('/otp', bodyParser, Otpgen)
router.get('/register', registerForm)

// async ()=>(await userModel.googleId)?router.get('/admin/data',verifyToken, getDashboard) : router.get('/admin/data', getDashboard)
router.get('/admin/data',verifyToken, getDashboard)

router.post('/admin/savedata', bodyParser, getPostdata)
// router.post('/checkLogin',bodyParser,checkUserData)
router.post('/checkLogin', bodyParser, checkLoginData)
router.get('/getpdf',bodyParser,getPDF)
// router.post(
//   "/checkLogin",
//   passport.authenticate("local", {
//     successRedirect: "/admin/data",
//     failureRedirect: "/test",
//   }),

//    async (req, res) => {
//     console.log(req.body)
//     res.send("done");
//   }
// );
// router.post('/checkLogin', passport.authenticate('local', {
//     successRedirect: '/admin/data',
//     failureRedirect: '/',
//     failureFlash: true // This option enables flash messages for authentication failures
//   }));


router.post('/otpverify', bodyParser, otpverify)
router.post('/changePass', bodyParser, changePass)

//categories
router.get('/admin/form', verifyToken, checkRole, getForm)
router.post('/savecat', bodyParser, savecat)
router.get('/delcat/:id', delcat)
router.get('/editcat/:id', showcat)
router.post('/edittcat/:id', bodyParser, editcat)

//Subcat:
router.post('/savesubcat', bodyParser, savesubcat)
// router.get('/showsubcat',getsubdata)
router.get('/admin/subcatform', getsubcatform)
router.get('/showsubcat/:id', verifyToken, editsubcat)
router.post('/updatesubcat/:id', updatesubcat)
router.get('/deletesubcat/:id', delsubcat)
router.get('/getData', getData)
router.get('/getFilteredData', getFilteredData)

//Products:
router.get('/admin/productform', getproduct)
router.post('/admin/productform', saveproduct)

//roles:
router.get('/admin/roleForm', checkRole, roleData)
router.post('/admin/roleForm', saverole)
router.get('/admin/delrole/:id', deleteRoleData)
router.get('/admin/editrole/:id', editRoleData)
router.post('/updateRole/:id', updaterole)



router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/'}),googleauthenticate) 
router.post('/signupdetails',bodyParser,signupdetails)
module.exports = router;