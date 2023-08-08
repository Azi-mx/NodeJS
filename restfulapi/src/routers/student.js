const express = require('express')
const router = new express.Router();
const Student = require('../models/students')

router.post('/students',async (req,res)=>{
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
router.get('/students', async(req,res)=>{
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
router.get('/students/:name', async (req,res)=>{
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
router.delete('/students/:id', async(req,res)=>{
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

router.patch("/students/:id",async(req,res)=>{
        try{
            const _id = req.params.id
            
            const updateStudents = await Student.findByIdAndUpdate({_id},req.body)
            res.send(updateStudents)
        }
        catch(err){
            res.status(404).send(err)
        }
})
module.exports = router