const mongoose = require('mongoose');
//This method returns a promise
mongoose.connect("mongodb://127.0.0.1:27017/employees",{useNewUrlParser:true}).then(()=>{
    console.log("Connection established");
}).catch((err)=>{
    console.log(err);
})
const empSchema = new mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String
})
const employee = new mongoose.model('employee', empSchema)

module.exports = employee
