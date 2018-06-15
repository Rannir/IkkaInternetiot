'use strict';

angular.module('ikka').controller('mainController', function($scope, $location, toaster, authService, $http) {
  const ctrl = this;

  ctrl.ay = 'ayee it works';

  return ctrl;
});
