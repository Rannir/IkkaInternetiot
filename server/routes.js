const passport = require('passport');
const express = require('express');
const router = express.Router();

const Authentication = require('./controllers/authentication');
const productsController = require('./controllers/products');

// session: false, is because passport wants to use a cookie
// based session for this request, since we are using tokens we dont want that
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

router.get('/', requireAuth, function(req, res) {
  res.send({message: 'Super secret code is ABC123'});
});
router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);
router.use(productsController);

module.exports = router;
