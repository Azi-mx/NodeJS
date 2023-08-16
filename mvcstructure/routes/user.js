const express = require('express');
const router  = new express.Router();
const {getuser, getuserData} = require('../controller/user')
const Employee = require('../controller/user')


router.route('/user').get(getuser)
router.route('/user/data').get(getuserData) 

router.post('/user',(req,res)=>{

})

module.exports = router;