angular.module('ikka').service('productsService', function($http) {
  const svc = this;

  svc.getProducts = async () => {
    const products = await $http.get(url);
    console.log(products);
  };

  return svc;
});
