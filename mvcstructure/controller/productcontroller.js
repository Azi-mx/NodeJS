const model = require('../model/productModel')
const catModel = require('../model/catModel');
const subcatmodel = require('../model/subcatModel');


const getproduct = async(req,res)=>{
        try {
            const getAll = await subcatmodel.find().populate('cat_id');
            const cat = await catModel.find();
            res.render('product', { username: 'AZIM', getAll: getAll, cat: cat, message: '', data: '' });
          } catch (error) {
            // Handle any errors that may occur during data retrieval
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
}
module.exports = getproduct