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

module.exports = router;
