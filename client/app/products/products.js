'use strict';

angular.module('ikka').controller('productsController', function($scope, $location, productsService, consts) {
  const ctrl = this;

    alert('');
  $scope.products = [];

  productsService.getProducts(consts.productsApi).then(products => {
    $scope.products = products;
    $scope.$apply();
  });

  return ctrl;
});
