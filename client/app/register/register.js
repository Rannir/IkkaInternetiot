'use strict';

angular.module('ikka').controller('registerController', function($scope, $location, authService, consts) {
  const ctrl = this;

  ctrl.register = function() {
    authService.signupUser(consts.signupApi, ctrl.model.Email, ctrl.model.Password, ctrl.model.Name, function() {
      $location.path('/');
    });
  };

  return ctrl;
});
