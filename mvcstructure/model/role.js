const mongoose = require('mongoose');

const roleSchema  = new mongoose.Schema({
    role_name:String,
    isActive:Boolean
})
    const roleModel = new mongoose.model('roleModel', roleSchema)
    module.exports = roleModel
