const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: String,
    price: Number,
    images : Array,
    description: String,
    cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'catModel' },
    sub_id: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory'}
  });

const productModel = new mongoose.model('prodModel',product);

module.exports = productModel;