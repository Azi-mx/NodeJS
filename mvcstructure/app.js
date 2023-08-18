const express = require('express')
const cookie = require('cookie-parser');
const app = express();
const router = require('./routes/user');
app.use(router);
app.use(express.static(__dirname))
app.use()

app.set('view engine','ejs')

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.listen(8080,()=>{
    console.log('listened on port 8080');
})
