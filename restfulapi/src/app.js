const express = require('express');
const app = express();
//require path of database
require("./db/conn")    
const Student = require('./models/students')

const port = process.env.PORT || 3000;

app.use(express.json())
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

app.post('/students',async (req,res)=>{
    try{
    const user = new Student(req.body)
    const Createuser = await user.save()
    res.status(201).send(Createuser)
    }
    catch(err){
     res.status(400).send(err)
    }
})

//Getting users data
app.get('/students', async(req,res)=>{
    try{
        const studentsData = await Student.find()
        res.send(studentsData)
    }
    catch(err){
    res.send(err)
    }
})

//Getting specific user data using id
// app.get('/students/:id', async (req,res)=>{
//     try{
//     const _id = req.params.id;
//     const studentData = await Student.findById({_id})
//     console.log(studentData)
//     if(!studentData){
//     return res.status(400).send()
//     }
//     else{
//          res.status(400).send(studentData)
//     }
//     }
//     catch(err){
//     res.send(err)
//     }
// })

//Getting specific user data using name
app.get('/students/:name', async (req,res)=>{
    try{
        const name = req.params.name;
        const studentData = await Student.find({name:name})
        if(!studentData){
            res.status(400).send()
        }
        else{
            res.send(studentData)
        }
    }
    catch(err){
    res.send(err)
    }
})

//delete user by its id
app.delete('/students/:id', async(req,res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id)
        if(!deleteStudent){
            res.status(400).send()
        }
        else{
        res.status(200).send(deleteStudent)
        }
    }
    catch(err){
    res.status(500).send(err)
    }
})

//Update user data by id

app.patch("/students/:id",async(req,res)=>{
        try{
            const _id = req.params.id
            
            const updateStudents = await Student.findByIdAndUpdate({_id},req.body)
            res.send(updateStudents)
        }
        catch(err){
            res.status(404).send(err)
        }
})

app.listen(port,()=>{
    console.log("Connection esatblished on port 3000");
})





//express.json() is a method inbuilt in express to a recognize the incoming Request Object as a JSON object 
//This method is called as a middleware in your application using the code: app.use(express.json());