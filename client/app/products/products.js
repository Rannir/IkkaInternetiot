'use strict';

angular.module('ikka').controller('productsController', function($scope, $location, productsService, consts) {
  const ctrl = this;

  $scope.mostPopular = '';
  $scope.products = [];

  productsService.getProducts(consts.productsApi).then(products => {
    $scope.products = products;
    $scope.$apply();
  });

  productsService.getPopularProduct(consts.productPopularApi).then(products => {
    $scope.mostPopular = products.name;
    $scope.$apply();
  });

  ctrl.query = async () => {
    let {brand, category, maxPrice} = $scope;

    maxPrice = maxPrice || Number.MAX_VALUE;

    const products = await productsService.queryProducts(consts.productsQueryApi, {brand, category, maxPrice});
    $scope.products = products;
    $scope.$apply();
  };

  ctrl.search = async () => {
    let {searchTerm} = $scope;

    const products = await productsService.searchProducts(consts.productsSearchApi, {searchTerm});
    $scope.products = products;
    $scope.$apply();
  };

  ctrl.productClicked = prod => {
    const {_id} = prod;
    productsService.productClicked(consts.productClickedApi, {_id});
  };

  return ctrl;
});
