let userModel = require('../Models/userModel')
const fs = require('fs');
let imgname = '';
let editdata = '';

const getForm = async (req, res) => {

    let user = await userModel.find();
   

    console.log(user);
    res.render('form',{
        data:user,
        editdata:editdata
    })
}

//Delete student
const deldata = async (req,res)=>{
    
    
    let userdata = await userModel.findOne({_id: req.params.id});
    console.log(userdata);
    imgname = 'uploads/'+userdata.image;
    console.log(imgname);
    fs.unlink(imgname,()=>{
        console.log("deleted");
    });
    let d = await userModel.findByIdAndDelete({_id:req.params.id})
    
    res.redirect('/form')

}
const edittdata = async (req,res)=>{
 
    // console.log(name);
    let user = await userModel.find()
     editdata = await userModel.find({_id: req.params.id});
        res.render('form',{
            data:user,
            editdata:editdata
        })
   
}

module.exports = {
    getForm,
    deldata,
    edittdata
}
