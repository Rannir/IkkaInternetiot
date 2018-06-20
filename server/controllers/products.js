const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/Product');
const Click = require('../models/clicked');

router.get('/products', async (req, res, next) => {
  try {
    res.send(await Product.find().sort('name'));
  } catch (err) {
    console.error('failed to fetch products');
    res.sendStatus(500);
  }
});

router.post('/products/query', async (req, res, next) => {
  try {
    const {brand = '', category = '', maxPrice = Number.MAX_VALUE} = req.body;

    const filteredProducts = await Product.find({
      price: {$lt: maxPrice},
      brand: {$regex: brand, $options: 'i'},
      category: {$regex: category, $options: 'i'},
    }).sort('name');
    res.send(filteredProducts);
  } catch (err) {
    console.error('failed to fetch products', err);
    res.sendStatus(500);
  }
});

router.post('/products/search', async (req, res, next) => {
  try {
    const {searchTerm} = req.body;

    const filteredProducts = await Product.find({
      $or: [
        {name: {$regex: searchTerm, $options: 'i'}},
        {brand: {$regex: searchTerm, $options: 'i'}},
        {category: {$regex: searchTerm, $options: 'i'}},
      ],
    }).sort('name');
    res.send(filteredProducts);
  } catch (err) {
    console.error('failed to fetch products', err);
    res.sendStatus(500);
  }
});

router.post('/products/clicked', async (req, res, next) => {
  try {
    const {_id} = req.body;

    let click = new Click();
    click._id = mongoose.Types.ObjectId();
    click.productId = _id;
    click.save();
    console.log('product', _id, 'saved');
    res.sendStatus(200);
  } catch (err) {
    console.error('failed to click', err);
    res.sendStatus(500);
  }
});

router.get('/products/mostPopularProduct', async (req, res, next) => {
  try {
    let products = await Click.aggregate([{$group: {_id: '$productId', count: {$sum: 1}}}]);
    products = products.reduce((max, b) => (max.count < b.count ? b : max));
    const filteredProducts = await Product.find({_id: products._id}).sort('name');
    res.send(filteredProducts);
  } catch (err) {
    console.error('failed to calculate mostShownCategory', err);
    res.sendStatus(500);
  }
});

router.get('/products/mostShownCategory', async (req, res, next) => {
  try {
    let products = await Product.aggregate([{$group: {_id: '$category', count: {$sum: 1}}}]);
    products = products.reduce((max, b) => (max.count < b.count ? b : max));
    res.send(products._id);
  } catch (err) {
    console.error('failed to calculate mostShownCategory', err);
    res.sendStatus(500);
  }
});

router.post('/products/postProduct', async (req, res, next) => {
  try {
    if (req.body._id == 0) {
      let newProduct = new Product();

      newProduct.name = req.body.name;
      newProduct.price = req.body.price;
      newProduct.description = req.body.description;
      newProduct.category = req.body.category;
      newProduct.brand = req.body.brand;

      res.send(await newProduct.save());
    } else {
      let newProduct = {};

      newProduct.name = req.body.name;
      newProduct.price = req.body.price;
      newProduct.description = req.body.description;
      newProduct.category = req.body.category;
      newProduct.brand = req.body.brand;

      res.send(await Product.findOneAndUpdate({_id: req.body._id}, newProduct, {upsert: true}));
    }
  } catch (err) {
    console.error('failed to save product');
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/products/deleteProduct', async (req, res, next) => {
  try {
    res.send(await Product.find({_id: req.body.id}).remove());
  } catch (err) {
    console.error('failed to delete product');
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/products/groupByBrand', async (req, res, next) => {
  try {
    Product.aggregate([{$group: {_id: '$brand', count: {$sum: 1}}}], function(err, result) {
      if (err) {
        next(err);
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    console.error('failed to group products by brand');
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/products/groupByCategory', async (req, res, next) => {
  try {
    Product.aggregate([{$group: {_id: '$category', count: {$sum: 1}}}], function(err, result) {
      if (err) {
        next(err);
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    console.error('failed to group products by category');
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
