angular.module('ikka').service('branchesService', function($http) {
  const svc = this;

  svc.getBranches = async url => {
    const branches = await $http.get(url);
    return branches.data;
  };

  return svc;
});
