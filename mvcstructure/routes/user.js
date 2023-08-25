const express = require('express');
const router  = new express.Router();
const {getDashboard, getForm,getPostdata,checkLoginData} = require('../controller/usercontroll');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended:false})




router.get('/admin/data',getDashboard)
router.get('/admin/form',getForm) 
router.post('/admin/savedata',bodyParser,getPostdata)
// router.post('/checkLogin',bodyParser,checkUserData)
router.post('/checkLogin',bodyParser,checkLoginData)





module.exports = router;