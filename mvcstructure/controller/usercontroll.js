const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String
})
const employee = new mongoose.model('employee', empSchema)

// const getuser = async(req,res)=>{
//     res.send("getuser called");
// }

// const getuserData = async()=>{
//     console.log("getuserData called");
// }
const getDashboard = async(req,res)=>{
    res.render('index')
}
const getForm = (req,res)=>{
    res.render('form')
}
const getPostdata = (req,res)=>{
    console.log(req.body);
    res.send("sucessful")
}
module.exports = {getDashboard, getPostdata,getForm,employee}