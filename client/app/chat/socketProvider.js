'use strict';

const ikkaChat = angular.module('ikkaChat', ['ngResource', 'ngRoute', 'ngMaterial']);

ikkaChat.factory('socket', function($rootScope) {
    const prvd = this;
    var socket = {};

    prvd.connect = function(chatServerUrl, chatServerResourcePath, token) {
        const options = {
            // query: {
            //     token: token? token: 'unauth'
            // }
        };

        if(chatServerResourcePath){
            options.path = chatServerResourcePath;
        }

        
        socket = io.connect(chatServerUrl, options);
    }

    prvd.on = function(eventName, callback) {
        socket.on(eventName, function() {
            var args = arguments;

            $rootScope.$apply(function() {
                callback.apply(socket, args);
            });
        });
    };

    prvd.emit = function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
            var args = arguments;

            $rootScope.$apply(function() {
                if(callback) {
                    callback.apply(socket, args);
                }
            });
        });
    };

    return prvd;
});