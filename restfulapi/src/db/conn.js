const mongoose = require('mongoose');
//This method returns a promise
mongoose.connect("mongodb://localhost:27017/students-api",{useNewUrlParser:true}).then(()=>{
    console.log("Connection established");
}).catch((err)=>{
    console.log(err);
})