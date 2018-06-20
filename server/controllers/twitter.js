const express = require('express');
const Twitter = require('twitter');
const router = express.Router();
const Product = require('../models/Product');

router.post('/twitter/tweet', async (req, res, next) => {
    try {
        let client = new Twitter({
            consumer_key: "pQJn6sjNxuivMZMlRz6aGIqSk",
            consumer_secret: "hRchrNrU8pv10e5HIu4eag5ZQz1J2jYPZuwv7ME6mMEnns6503",
            access_token_key: "924214133867806720-2LCmCadngZ8HU7FedaBRDF3qPBZKm39",
            access_token_secret: "vDdph6vAYdW41Xq95G6MR3fuRvC8xLw6MxuZwt49XnGef"
          });

        client.post('statuses/update', {status: req.body.tweet},  function(error, tweet, response) {
            if(error && error[0].code != 187) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log("worked:" + tweet);
                res.sendStatus(200);
            }
          });
      } catch (err) {
        console.error('failed to fetch products');
        res.sendStatus(500);
      }
});

module.exports = router;
