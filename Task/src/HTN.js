const express = require('express')
const app = express()
const path = require('path')


const mainpath = path.join(__dirname, '../Public/css/')
console.log(mainpath);
app.use(express.static(mainpath))
app.set('view engine', 'ejs')

app.get('/Home',(req,res)=>{
    res.render('index')
})
app.get('/About',(req,res)=>{
    res.render('about')
})
app.get('/Contact',(req,res)=>{
    res.render('contact')
})
app.get('/User',(req,res)=>{
    res.render('form')
})
app.listen(8000,()=>{
    console.log('8000 server is running')
})