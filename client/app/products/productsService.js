angular.module('ikka').service('productsService', function($http) {
  const svc = this;

  svc.getProducts = async url => {
    const products = await $http.get(url);
    return products.data;
  };

  return svc;
});
