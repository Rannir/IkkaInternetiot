const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
});

const Click = mongoose.model('click', schema);

module.exports = Click;
