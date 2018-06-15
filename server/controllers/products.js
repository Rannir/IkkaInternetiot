const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res, next) => {
  res.send(await Product.find());
});

module.exports = router;
