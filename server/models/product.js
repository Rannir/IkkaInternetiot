const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    price: Number,
    description: String,
    photos: [String],
});

const ProductClass = model('product', productSchema);

module.exports = ProductClass;
