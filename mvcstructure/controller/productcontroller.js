const model = require('../model/productModel')
const catModel = require('../model/catModel');
const subcatmodel = require('../model/subcatModel');


const getproduct = async(req,res)=>{
        try {
            const cat = await catModel.find();
            const sub_cat = await subcatmodel.find();
            const getAllprod = await model.find().populate('cat_id').populate('sub_id');
            res.render('product', { username: 'AZIM', getAllprod: getAllprod, cat: cat,sub_cat:sub_cat, message: '', data: '' });
          } catch (error) {
            // Handle any errors that may occur during data retrieval
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
}

const saveproduct = async (req, res,next)=>{
  console.log(req.body)
  try {
      
      // to declare some path to store your converted image
      const path = '././images/'+Date.now()+'.png'

      console.log(req.body)
      const imgdata = req.body.image;
      
      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');        
      // fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
      const result = {
          cat_id:req.body.cat_id,
          sub_id:req.body.sub_id,
          price:req.body.price,
          name:req.body.name,
          images:[base64Data]
      }
      const savedata = new model(result);
      await savedata.save();
      
  } catch (e) {
      next(e);
  }
}
module.exports = {getproduct,saveproduct}