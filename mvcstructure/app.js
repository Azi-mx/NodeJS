const express = require('express')
const cookie = require('cookie-parser');
const app = express();
app.use(cookie())
const router = require('./routes/user');
app.use(router);
app.use(express.static(__dirname))
 
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.listen(8080,()=>{
    console.log('listened on port 8080');
})
