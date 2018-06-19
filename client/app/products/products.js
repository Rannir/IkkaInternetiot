'use strict';

angular.module('ikka').controller('productsController', function($scope, $location, productsService, consts) {
  const ctrl = this;

    alert('');
  $scope.products = [];

  productsService.getProducts(consts.productsApi).then(products => {
    $scope.products = products;
    $scope.$apply();
  });

  ctrl.search = async () => {
    let {brand, category, maxPrice} = $scope;

    maxPrice = maxPrice || Number.MAX_VALUE;

    const products = await productsService.queryProducts(consts.productsQueryApi, {brand, category, maxPrice});
    $scope.products = products;
    $scope.$apply();
  };

  return ctrl;
});
