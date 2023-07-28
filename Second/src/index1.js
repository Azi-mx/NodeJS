const express = require("express")
const path = require("path")

const app = express();
const port = 8000;

const hbs = require("hbs");

// console.log(path.join(__dirname, '../public'))
//built-in middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath));

//to change the views directory name:
let templatePath = path.join(__dirname,'../templates/views')

let partialsPath = path.join(__dirname,'../templates/partials')

//Set the view engine
app.set("view engine", "hbs")
app.set("views",templatePath)
hbs.registerPartials(partialsPath)
//template engine route
app.get("/",(req,res)=>{
    res.render("index", {
        //passing object to hbs file
        varName:"Azim",
    })
})

app.get("/about",(req,res)=>{
    res.render("about")
})
app.get('/contact',(req,res)=>{
    res.render("contact")
})
app.get("/",(req,res)=>{
    res.send("Hello World")
})


//Keep this in bottom imp!!!

app.get('/about/*',(req,res)=>{
    res.render("404",{
        errorcomment:"this Page  in about section could not Found"
    })
})
app.get('*',(req,res)=>{
    res.render("404",{
        errorcomment:"Page not Found"
    })
})
app.listen(port,()=>{
    console.log("listening on")
})