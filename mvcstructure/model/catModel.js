const mongoose = require('mongoose');

const catSchema  = new mongoose.Schema({
    id:Number,
    name:String
})



    const catModel = new mongoose.model('catModel', catSchema)
    module.exports = catModel
