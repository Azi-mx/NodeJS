const mongoose = require('mongoose');

const subCategory = new mongoose.Schema({
    name: String,
    cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'catModel' }
  });

const subcatmodel = new mongoose.model('subcategory',subCategory);

module.exports = subcatmodel;