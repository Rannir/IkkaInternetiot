'use strict';

global.angular = require('angular');
global.$ = require('jquery');
global.jquery = $;
global.jQuery = $;
global.ngRoute = require('angular-route');
global.ngResource = require('angular-resource');
global.ngAnimate = require('angular-animate');
global.ngAria = require('angular-aria');
//global.ngMessages = require('angular-messages');
global.ngMaterial = require('angular-material');
global.angularSpinner = require('angular-spinner');
global.Spinner = require('spin.js');
global.bootstrap = require('bootstrap');
global._ = require('lodash');
global.io = require('socket.io-client');

angular.isUndefinedOrNull = function(obj) {
  return angular.isUndefined(obj) || obj === null || obj === '';
};
