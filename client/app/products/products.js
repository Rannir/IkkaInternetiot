'use strict';

angular.module('ikka').component('productsComponent', {
  templateUrl: 'products.html',
  controller: productsComponentController,
});

const productsComponentController = function($scope, $element, $attrs, productsService, $location) {
  const ctrl = this;

  ctrl.getProducts = () => {
    productsService.getProducts();
  };

  return ctrl;
};
