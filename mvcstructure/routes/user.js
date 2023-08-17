const express = require('express');
const router  = new express.Router();
const {getDashboard, getForm} = require('../controller/usercontroll')
// const Employee = require('../controller/user')



router.get('/admin/data',getDashboard)
router.get('/admin/form',getForm) 



module.exports = router;