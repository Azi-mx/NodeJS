const mongoose = require('mongoose');
//This method returns a promise
const main  = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/employees",{useNewUrlParser:true})
        console.log("Connection Established Success");
    }catch(err){
        console.log(err);
    }
}
main();
const empSchema = new mongoose.Schema({
    id:Number,
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})
const employee = new mongoose.model('employee', empSchema)

module.exports = employee
