const express = require('express')
const app = express();
const path  = require("path")


const staticPath  = path.join(__dirname,'../public')
//built-in middle ware 
app.use(express.static(staticPath))

app.get('/', (req, res) => {
  res.send('Hello to the main page!')
})
app.get('/about', (req, res) => {

    //res.send({
        //Here we can send object and array or json data too.  
    //})
    res.send('Hello to the about page!')
})

app.listen(3000,() => {console.log(`Port running on port 3000`)})