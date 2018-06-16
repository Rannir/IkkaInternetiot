'use strict';

angular.module('ikka').controller('productsController', function($scope, $location, toaster, productsService, $http) {
  const ctrl = this;

  console.log('wwww');

  ctrl.$onInit = function() {
    console.log('asdasdas');
  };

  ctrl.testFunc = () => {
    console.log('asdasda');
  };

  ctrl.activate = () => {
    console.log('productsService.getProducts()');
  };

  return ctrl;
});
