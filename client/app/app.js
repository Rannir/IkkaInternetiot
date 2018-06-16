'use strict';

const ikka = angular.module('ikka', [
  'toaster',
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'angularSpinner',
  'ngMaterial',
  'ikkaAuth',
  'ikkaChat',
]);

ikka.service('authHeader', function() {
  let srv = this;

  srv.request = function(config) {
    if (!angular.isUndefinedOrNull(localStorage.getItem('token'))) {
      config.headers.authorization = localStorage.getItem('token');
    }

    return config;
  };

  return srv;
});

ikka.config([
  '$routeProvider',
  '$locationProvider',
  '$httpProvider',
  ($routeProvider, $locationProvider, $httpProvider) => {
    $locationProvider.hashPrefix('');

    $httpProvider.interceptors.push('authHeader');

    $routeProvider
      .when('/', {
        templateUrl: /*!*/ 'HTML/main.html',
        controller: 'mainController',
        controllerAs: 'ctrl',
      })
      .when('/register', {
        templateUrl: /*!*/ 'HTML/register.html',
        controller: 'registerController',
        controllerAs: 'ctrl',
      })
      .when('/login', {
        templateUrl: /*!*/ 'HTML/login.html',
        controller: 'loginController',
        controllerAs: 'ctrl',
      })
      .when('/products', {
        templateUrl: /*!*/ 'HTML/products.html',
        controller: 'productsController',
        controllerAs: 'ctrl',
      });
  },
]);

ikka.config = {
  capabilities: {
    browserName: 'chrome',
    version: '',
    platform: 'ANY',
    chromeOptions: {
      args: ['lang=utf8'],
    },
  },
};
