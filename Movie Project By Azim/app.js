const express = require('express');
const app = express();
const body = require('body-parser');
const routes = require('./routes/user');
app.use(express.static(__dirname))
app.set("view engine","ejs")
app.use(routes)
app.use(express.static('uploads'));

const bodyparse = body.urlencoded({extended:false})



app.listen(8000,()=>{
    console.log("File Running and port running 8000");
})