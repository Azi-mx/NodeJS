const express = require('express')
const app = express();
const router = require('./routes/user');
app.use(router);

app.get('/',(req,res)=>{
    res.send("Welcome")
})
app.listen(8080,()=>{
    console.log('listened on port 8080');
})
