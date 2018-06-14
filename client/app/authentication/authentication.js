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
    ctrl.usrName = '';

    $scope.$watch(authService.hasUserAuthenticated, function(newValue) {
        ctrl.hasLoggedIn = newValue;
        ctrl.usrName = authService.getUserName();
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