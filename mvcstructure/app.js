const express = require('express')
const flash = require('connect-flash')

const cookie = require('cookie-parser');
const app = express();
const session = require('express-session');
app.use(cookie())
const router = require('./routes/user');
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));

app.use(flash())
app.use(router);
app.use(express.static(__dirname))


 
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('login',{message:''});
})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.listen(8080,()=>{
    console.log('listened on port 8080');
})
