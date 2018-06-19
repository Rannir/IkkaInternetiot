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

router.get('/products/mostShownCategory', async (req, res, next) => {
  Product.find({}, function(err, products) {
    if (err) {
      console.error('failed load products');
      console.log(err);
      res.sendStatus(500);
    }

    if (products && products.length != 0) {
      let maxCount = 0;
      let categoryName = '';

      for(let i = 0; i < products.length; i++){
        let currCount = 0;

        for(let j = 0; j < products.length; j++){
          if(products[i].category == products[j].category){
            currCount++;
          }
        }

        if(currCount > maxCount) {
          maxCount = currCount;
          categoryName = products[i].category;
        }
      }

      res.send(categoryName);
    } else {
      res.send('');
    }
  });
});

router.post('/products/postProduct', async (req, res, next) => {
  
  try {
    if(req.body._id == 0) {
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

      res.send(await Product.findOneAndUpdate({'_id': req.body._id}, newProduct, {upsert:true}));
    }
    
  } catch (err) {
    console.error('failed to save product');
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/products/deleteProduct', async (req, res, next) => {

    try {
      res.send(await Product.find({'_id': req.body.id}).remove());
    } catch (err) {  
      console.error('failed to delete product');
      console.log(err);
      res.sendStatus(500);
    }
});

router.get('/products/groupByBrand', async (req, res, next) => {

  try {
    Product.aggregate([
      {"$group" : {_id:"$brand", count:{$sum:1}}}
    ], function (err, result) {
      if(err) {
        next(err);
      } else {
        res.send(result)
      }
    });
  } catch(err) {
    console.error('failed to group products by brand');
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/products/groupByCategory', async (req, res, next) => {

  try {
    Product.aggregate([
      {"$group" : {_id:"$category", count:{$sum:1}}}
    ], function (err, result) {
      if(err) {
        next(err);
      } else {
        res.send(result)
      }
    });
  } catch(err) {
    console.error('failed to group products by category');
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
