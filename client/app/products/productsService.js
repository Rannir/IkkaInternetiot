angular.module('ikka').service('productsService', $http => {
  this.getProducts = async () => {
    const products = await $http.get(url);
    console.log(products);
  };

  return srvc;
});
