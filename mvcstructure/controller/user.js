const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String
})
const employee = new mongoose.model('employee', empSchema)

const getuser = async(req,res)=>{
    res.send("getuser called");
}

const getuserData = async()=>{
    console.log("getuserData called");
}
module.exports = {getuser, getuserData,employee}