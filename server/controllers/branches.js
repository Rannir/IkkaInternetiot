const express = require('express');
const router = express.Router();
const Branch = require('../models/branch');

router.get('/branches', async (req, res, next) => {
    try {
        res.send(await Branch.find());
    } catch (err) {
        console.error('failed to fetch branches');
        res.sendStatus(500);
    }
});

module.exports = router;
