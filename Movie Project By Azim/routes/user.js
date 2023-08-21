const express = require('express');
const router  = new express.Router();
const {getForm} = require('../controller/userControll');

const body = require('body-parser');
const bodyParser = body.urlencoded({extended:false})

router.get('/form',getForm) 





module.exports = router;