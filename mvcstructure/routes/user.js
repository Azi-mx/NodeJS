const express = require('express');
const router  = new express.Router();
const {getDashboard, getForm,getPostdata} = require('../controller/usercontroll');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended:false})
// const Employee = require('../controller/user')



router.get('/admin/data',getDashboard)
router.get('/admin/form',getForm) 
router.post('/admin/savedata',bodyParser,getPostdata)



module.exports = router;