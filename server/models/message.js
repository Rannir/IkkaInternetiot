const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  creation_date: Date,
});

const ModelClass = mongoose.model('message', messageSchema);

module.exports = ModelClass;
