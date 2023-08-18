let userModel = require('../model/userModels')
const getDashboard = async (req, res) => {
    res.render('index')
}
const getForm = (req, res) => {
    res.render('form')
}
const getPostdata = async (req, res) => {
    let checkuser = await userModel.findOne({ email: req.body.email })
    if (checkuser) {
        return res.send("Email is already in use")
    }
    else {
        const result = await userModel({
            id: 1,
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const res1 = await result.save();
        console.log('User saved successfully');
        console.log(res1);
        // res.send(res1)
        res.redirect('/admin/form')
    }
}


const checkUserData = async (req,res)=>{
    let checkuser = await userModel.findOne({ email: req.body.email, password:req.body.password})
    if (checkuser) {
        return res.send("Email is already in use")
    }
    else{
        res.redirect('/admin/form')
    }
}
module.exports = { getDashboard, getPostdata, getForm,checkUserData }