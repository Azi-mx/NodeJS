const express = require('express')
const app = express();
require('./db/config');
const User = require('./db/User');
const cors = require('cors');

app.use(cors())

app.use(express.json())
app.post('/register',async (req,res)=>{
    try{
        let user = new User(req.body)
        let Createuser = await user.save();
        res.status(200).send(Createuser)
    }catch(err){
        res.status(400).send(err)
    }
})
app.get('/',(req,res)=>{
    res.send("hello World")
})
app.listen(8000,()=>{
    console.log("connected");
})