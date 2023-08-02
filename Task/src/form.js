const express = require('express');
const app = express();

const path = require('path');

const mainpath = path.join(__dirname,"../Public");
app.use(express.static(mainpath));


app.set("views","ejs")
app.get('/',(req,res)=>{
    res.write("<h1>Hello World</h1>")
    res.send()
})

app.get('/user',(req,res)=>{
    res.sendFile(mainpath+'form.html')
})
app.get('/savedata',(req,res)=>{
    res.write("Name is"+ req.query.name)
    res.write("Email is" + req.query.email)
    res.send()
})
app.listen(8000,"localhost",()=>{
    console.log("Server running");
})