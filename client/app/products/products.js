'use strict';

angular.module('ikka').controller('productsController', function($scope, $location, productsService, consts) {
  const ctrl = this;

  $scope.products = [];

  productsService.getProducts(consts.productsApi).then(products => {
    $scope.products = products;
  });

  return ctrl;
});
