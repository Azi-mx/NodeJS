const express = require('express');
const catModel = require('../model/catModel');

const subcatmodel = require('../model/subcatModel'); // Make sure you require your model
const app = express();
app.use(express.json());

const savesubcat = async(req,res)=>{
    const name = req.body.name;
    const id = req.body.cat_id;
console.log(name,id);
    const result = {
        name:name,
        cat_id: id
    }
    const savedata = new subcatmodel(result);
    await savedata.save()
    res.redirect('/admin/subcatform')
}
// const getsubdata = async(req,res)=>{
//     subcatmodel.find()
//     .populate("cat_id")
    
// }
const getsubcatform = async (req,res)=>{
    const getAll = await subcatmodel.find().populate("cat_id")
    const cat = await catModel.find()
    res.render('subcatform',{ username: 'AZIM', getAll: getAll,cat:cat, message: '', data: '' })
}
module.exports = {savesubcat,getsubcatform};