const User = require('../models/user');
const Message = require('../models/message');
const jwtDecode = require('jwt-decode');

const verifyUserIsAdmin = function(token, callback) {
    let decodedtoken = {};
    
    if(token != 'unauth'){
        decodedtoken = jwtDecode(token);
        
        User.findById(decodedtoken.sub, function(err, user) {
            if (err) {
                //io.emit('message-received', 'error in find');
            }
    
            if (user && user.isAdmin) {
                callback();
            } else {
                //io.emit('message-received', 'error');
            }
        });
    }
}

exports.initChat = (io) => {
    io.on('connection', function(socket){

        Message.find({}, function(err, Messages) {
            io.emit('connection-successfull', Messages);
        });
    
        socket.on('delete-message', function(data) {
            verifyUserIsAdmin(data.token, function() {
                Message.findOneAndRemove({_id: data.msg._id}, function() {
                    Message.find({}, function(err, Messages) {
                        io.emit('connection-successfull', Messages);
                    });
                });
            });
        });

        socket.on('send-message', function(data) {
            verifyUserIsAdmin(data.token, function() {
                const msg = new Message({ message : data.msg, creation_date : Date.now() });

                msg.save(function(err) {
                    if(!err){
                        io.emit('message-received', msg);
                    }
                });
            });
        });
    });
};