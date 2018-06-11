const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, nest) {
    // User has already had their email and password auth'd
    // we justneed to give them a token

    // passport had our backs! and assigns the req.user as our user 
    // from the done callback
    res.send({ token: tokenForUser(req.user), userName: req.user.name });
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.userName;
    console.log({
        email,
        password,
        name});

    if(!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exists
    User.findOne({ email }, function(err, existingUser) {
        // Handle data base connection error
        if(err) { return next(err); }

        // If a user with email does exist, return an error
        if(existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email,
            password,
            name
        });

        user.save(function(err) {
            if(err) { return next(err); }
            
            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user), userName: user.name });
        });
    });
}