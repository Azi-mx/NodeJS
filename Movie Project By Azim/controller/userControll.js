let userModel = require('../Models/userModel')
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const getForm = (req, res) => {
    res.render('form')
}

module.exports = {getForm}
