'use strict';

angular.module('ikkaChat').component('chatComponent', {
  templateUrl: 'chat.html',
  controller: chatController,
  bindings: {
    chatServerUrl: '=',
    chatServerResourcePath: '=',
    token: '=',
    isAdmin: '=',
  },
});

function chatController($scope, $element, $attrs, socket, $timeout) {
  const ctrl = this;
  ctrl.messages = [];

  $timeout(function() {
    socket.connect(
      ctrl.chatServerUrl,
      ctrl.chatServerResourcePath,
      ctrl.token,
    );

    socket.on('connection-successfull', function(data) {
      ctrl.messages = [...data];
    });

    socket.on('message-received', function(data) {
      ctrl.messages.push(data);
    });

    ctrl.sendMessage = function() {
      socket.emit('send-message', {msg: ctrl.message, token: ctrl.token ? ctrl.token : 'unauth'});
      ctrl.message = '';
    };

    ctrl.deleteMessage = function(msg) {
      socket.emit('delete-message', {msg, token: ctrl.token ? ctrl.token : 'unauth'});
    };
  });

  return ctrl;
}
