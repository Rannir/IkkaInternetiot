const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
   name: String,
   address: String,
   city: String,
   lat: Number,
   lng: Number,
});

const Branch = mongoose.model('branch', schema);

module.exports = Branch;
