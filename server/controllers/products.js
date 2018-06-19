const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res, next) => {
  try {
    res.send(await Product.find());
  } catch (err) {
    console.error('failed to fetch products');
    res.sendStatus(500);
  }
});

router.post('/products/postProduct', async (req, res, next) => {
  
  try {
    
    let newProduct = new Product();    
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.description = req.body.description;
    newProduct.category = req.body.category;
    newProduct.watchedCounter = req.body.watchedCounter;

  res.send(await newProduct.save());
    
  } catch (err) {
    console.error('failed to save product');
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
