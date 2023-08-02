const express = require('express')
const app = express()
const path = require('path')
const body = require('body-parser')

const bodyparser = body.urlencoded({extended:false})

const mainpath = path.join(__dirname, "../public")

app.use(express.static(mainpath))

app.set('view engine', 'ejs')

let userdata = [
    {
        id:1,
        name: 'John',
        age:22
    },
    {
        id:2,
        name: 'Jodfghn',
        age:72
    },
    {
        id:3,
        name: 'Jttytohn',
        age:62
    },
    {
        id:4,
        name: 'Johthvbvn',
        age:32
    },
    {
        id:5,
        name: 'Jobbvhn',
        age:21
    }
    ]
app.get('/', (req, res) => {
    res.render('index',{
        data:userdata
    })
})

app.get('/del/:id', (req, res) => {
    id = req.params.id
    id--;
    userdata.splice(id, 1)
    userdata.forEach((i)=>{
        if(i.id > id)
            i.id--;
    })

    res.redirect('/')
})


app.post("/savedata",bodyparser,(req,res)=>{
    data = {
        id:userdata.length+1,
        name:req.body.name,
        age:req.body.age
    }
    userdata.push(data)
    res.redirect('/')
})
app.listen(8080,()=>{
    console.log('listening on port 8080')
})

