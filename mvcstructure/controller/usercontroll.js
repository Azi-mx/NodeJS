let userModel = require('../model/userModels')
const getDashboard = async(req,res)=>{
    res.render('index')
}
const getForm = (req,res)=>{
    res.render('form')
}
const getPostdata = async (req,res)=>{
    const result = await userModel({
        id:1,
        name:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    const res1 = await result.save();
    req.redirect('/admin/data')
}
module.exports = {getDashboard, getPostdata,getForm}