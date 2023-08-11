const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
const body = require('body-parser');
const path = require('path');

const multer = require('multer');
let imgname = '';
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
       imgname = Date.now() +file.originalname 
    }
  })
const upload = multer({ storage: storage })





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

//Delete student
app.get('/del/:name', async (req,res)=>{
    let name = req.params.name;
    let d = await collection.deleteOne({name:name})
    let f = await collection.find({}).toArray();
    
    res.render('form',{
        data:f,
        editdata:editdata
    })
})

app.post('/savedata',upload.single('image'), async (req,res)=>{
    id = req.body.id;
    if(id != ''){
        console.log("id is " + id)
        //update
        udata.find((i)=>{
            if(i.id==id){
                i.name = req.body.name;
                i.age = req.body.age
                // i.image = 
            }
        })
        let finalUpdate = await collection.updateOne({
            id:id
        },{ $set:{
            name:req.body.name,
            age:req.body.age
        }})
        console.log(finalUpdate)
    }
    else{
        //push
        let ide = udata.length+1
    let data = {
        id: ide.toString(),
        name:req.body.name,
        age:req.body.age

    }
    
    udata.push(data);
    let result = await collection.insertOne(data);

}
   editdata = '';
  
    res.redirect('/form')

})


app.get('/edit/:name',(req,res)=>{
    let name = req.params.name;
    console.log(name);
    // let age = req.body.age;
    // console.log(age);
    // console.log('Requested ID:', id);
     editdata = udata.find((i)=>i.id == name);
    //  editdata += editdata.name = name;
    //  editdata += editdata.age = age;
    // console.log('Edit Data:', editdata);
    // console.log(editdata)

        res.render('form',{
            data:udata,
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





