const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  brand: String,
  photos: [String],
});

const Product = mongoose.model('product', schema);

module.exports = Product;
