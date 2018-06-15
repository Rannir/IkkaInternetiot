const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  description: String,
  photos: [String],
});

const Product = mongoose.model('product', schema);

module.exports = Product;
