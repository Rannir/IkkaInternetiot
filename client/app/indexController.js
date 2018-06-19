'use strict';

angular.module('ikka').controller('indexController', function($scope, $location, toaster, authService, consts) {
  const ctrl = this;

  ctrl.chatServerUrl = consts.chatUrl;
  ctrl.chatResource = consts.chatReourcePath;

  $scope.$watch(authService.hasUserAuthenticated, function(newValue) {
    ctrl.token = authService.getUserToken();
    ctrl.isAdmin = authService.getIsAdmin();
  });

  ctrl.navMain = function() {
    $location.path('/');
  }

  ctrl.register = function() {
    $location.path('/register');
  };

  ctrl.login = function() {
    $location.path('/login');
  };

  ctrl.logout = function() {
    $location.path('/');
  };

  return ctrl;
});
