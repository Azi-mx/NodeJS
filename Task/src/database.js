const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
const body = require('body-parser');
const path = require('path');


const mainpath = path.join(__dirname,"../Public");
app.use(express.static(mainpath));


app.set("view engine","ejs")
const bodyparse = body.urlencoded({extended:false})

const client = new MongoClient(url);
app.get('/',(req,res)=>{
    res.send("Hello");
})
async function main() {
    try{
        await client.connect();
        console.log("Database connection established");
        const db = client.db('studentdb');
        const collection = db.collection('studentdb');
        const udata = await collection.find({}).toArray();
        //insert into collection

let editdata = ''
let userdata = [
    {
        id:1,
        name:"Vishal",
        age:20
    },
    {
        id:2,
        name:"Kuntesh",
        age:23
    },
    {
        id:3,
        name:"Bharat",
        age:26
    }
]

app.get('/form',(req,res)=>{
    res.render('form',{
        data:udata,
        editdata:editdata
    })
})

app.get('/del/:id', async (req,res)=>{
    let id = req.params.id;
    id = id-1;
    udata.splice(id,1)
    let j=1;
    userdata.forEach((i)=>{
        i.id=j;
        j++
    })
    res.redirect('form')
})

app.post('/savedata',bodyparse, async (req,res)=>{
    id = req.body.id;
    if(id != ''){
        //update
        userdata.find((i)=>{
            if(i.id==id){
                i.name = req.body.name;
                i.age = req.body.age
            }
        })
    }
    else{
        //push
    let data = {
        id: udata.length+1,
        name:req.body.name,
        age:req.body.age
    }
    
    udata.push(data);
    let result = await collection.insertOne(data);

}
   editdata = '';
   res.render('form',{
    data:udata,
    editdata:editdata
   })
})


app.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    // console.log('Requested ID:', id);
     editdata = userdata.find((i)=>i.id == id);
    // console.log('Edit Data:', editdata);
    // console.log(editdata)

        res.render('form',{
            data:userdata,
            editdata:editdata
        })
   
})


app.get('/',(req,res)=>{
    res.write("<h1>Hello World</h1>")
    res.send()
})


// app.get('/savedata',(req,res)=>{
//     res.write("Name is"+ req.query.name)
//     res.write("Email is" + req.query.email)
//     res.send()
// })
        

    }
    catch(err){
        console.log(err);
    }
}
main();

app.listen(8000,()=>{
    console.log("Database connection established");
})





