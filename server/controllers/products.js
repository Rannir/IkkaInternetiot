const express = require('express');
const router = express.Router();

router.get('/products', (req, res, next) => {
    console.log('test');
    res.send('blaaa');

    
});

module.exports = router;
