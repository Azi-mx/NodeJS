const express = require('express');
const app = express();
//require path of database
require("./db/conn")    

const Student = require('./models/students')


// To make router work 
const Studentrouter = require('./routers/student')
const port = process.env.PORT || 3000;


//To get data in proper json format this is used
//We can get data from anywhere like postman, dynamically anywhere
app.use(express.json());

//To make router work this is necessary
app.use(Studentrouter);


app.get('/',(req,res)=>{
    res.send("Hello");
})

//creating new users by 2 methods
//create new students 

// app.post('/students',(req,res)=>{
//     console.log(req.body)
//     const user = new Student(req.body)

//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((err)=>{
//     res.status(400).send(err)
//     })
// })


//1. Create new router
// const router = new express.Router();

// 2. We need to define router
// router.get('/azim',(req,res)=>{
//     res.send("Hello")
// })
// 3. We need to register our router
// app.use(router)


app.listen(port,()=>{
    console.log("Connection esatblished on port 3000");
})





//express.json() is a method inbuilt in express to a recognize the incoming Request Object as a JSON object 
//This method is called as a middleware in your application using the code: app.use(express.json());