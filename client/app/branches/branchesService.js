angular.module('ikka').service('branchesService', function($http) {
  const svc = this;

  svc.getBranches = async url => {
    const branches = await $http.get(url);
    console.log(branches);
    return branches.data;
  };

  return svc;
});
