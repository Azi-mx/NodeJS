const express = require('express');
const catModel = require('../model/catModel');
const subcatmodel = require('../model/subcatModel');
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation

const app = express();
app.use(express.json());

const savesubcat = async (req, res) => {
    try {
      const name = req.body.name;
      const id = req.body.cat_id;
  
      console.log('Received cat_id:', id); // Add this line for debugging
  
      // Validate the cat_id before proceeding
    //   if (!mongoose.Types.ObjectId.isValid(id)) {
    //     // Handle the case where id (cat_id) is not a valid ObjectId
    //     return res.status(400).json({ error: 'Invalid cat_id' });
    //   }
  
      const result = {
        name: name,
        cat_id: id
      }
  
      const savedata = new subcatmodel(result);
      await savedata.save();
      res.redirect('/admin/subcatform');
    } catch (error) {
      // Handle any other unexpected errors here
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const getsubcatform = async (req, res) => {
  try {
    const getAll = await subcatmodel.find().populate('cat_id');
    const cat = await catModel.find();
    res.render('subcatform', { username: 'AZIM', getAll: getAll, cat: cat, message: '', data: '' });
  } catch (error) {
    // Handle any errors that may occur during data retrieval
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editsubcat = async (req, res) => {
    try {
        let id = req.params.id
        let data = await subcatmodel.findOne({ _id: id })
        // let name = data.name;
        const getAll = await subcatmodel.find({});
        const cat = await catModel.find();
        // res.redirect('/admin/form?data=' + JSON.stringify(data));

        res.render('subcatform', { username: 'AZIM', getAll: getAll, message: '',cat: cat, data: data });
    }
    catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).send('Internal Server Error')
    }

}
const updatesubcat = async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    await subcatmodel.findByIdAndUpdate({ _id: id }, { $set: { name: name } })
    res.redirect('/admin/subcatform')
}
const delsubcat = async (req, res) => {
    let id = req.params.id
    await subcatmodel.findByIdAndRemove({ _id: id })
    console.log("Data Removed");
    res.redirect('/admin/subcatform')

    // res.redirect('/admin/form')
}
const getCatData = async(req,res) => {
    let cat_id = req.query.selectedValue;
    let subData;
    if(cat_id != '') {
        subData =  await subcatmodel.find({cat_id:cat_id}).populate("cat_id");
    }
    else {
        subData =  await subcatmodel.find().populate("cat_id");
    }

        res.json(subData);
    

}
module.exports = { savesubcat, getsubcatform,editsubcat,updatesubcat,delsubcat };
