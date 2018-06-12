'use strict';

angular.module('ikkaAuth').component('authComponent', {
    templateUrl: 'authentication.html',
    controller: authComponentController,
    bindings: {
        loginFunction: '&',
        registerFunction: '&',
        logoutFunction: '&'
      }
});

function authComponentController($scope, $element, $attrs, authService, $location) {
    const ctrl = this;
    ctrl.hasLoggedIn = false;

    $scope.$watch(authService.hasUserAuthenticated, function(newValue) {
        ctrl.hasLoggedIn = newValue;
    });
    
    ctrl.login = function() {
        ctrl.loginFunction();
    };
    
    ctrl.register = function() {
        ctrl.registerFunction();
    };

    ctrl.logout = function() {
        authService.signoutUser();
        ctrl.logoutFunction();
    };

    return ctrl;
}