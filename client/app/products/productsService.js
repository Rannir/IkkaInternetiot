angular.module('ikka').service('productsService', function($http) {
  const svc = this;

  svc.getProducts = async url => {
    const products = await $http.get(url);
    return products.data;
  };

  svc.insertProduct = async function(url, product) {
    return $http.post(url, product).then(function (result) {
      return result.data;
    });
  };

  svc.deleteProduct = async function(url, id) {
    return $http.post(url, {'id':id}).then(function (result) {
      return result.data;
    });
  };

  return svc;
});
