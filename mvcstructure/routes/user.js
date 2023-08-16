const express = require('express');
const router  = express.Router();
const {getuser, getuserData} = require('../controller/user')
router.route('/user').get(getuser)
router.route('/user/data').get(getuserData) 

module.exports = router;