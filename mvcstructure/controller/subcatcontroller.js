const express = require('express');
const catModel = require('../model/catModel');

const subcatmodel = require('../model/subcatModel'); // Make sure you require your model
const app = express();
app.use(express.json());

const savesubcat = async(req,res)=>{
    const name = req.body.name;
    const id = req.body.cat_id;

    const result = {
        name:name,
        cat_id: id
    }
    const savedata = new subcatmodel(result);
    await savedata.save()
    let getdata = await subcatmodel.find()
    res.json(getdata)
}
const getsubdata = async(req,res)=>{
    subcatmodel.find()
    .populate("cat_id")
    .then(p=>console.log(p))
    .catch(error=>console.log(error));
}

module.exports = {savesubcat,getsubdata};