'use strict';

angular.module('ikkaAuth').component('authComponent', {
    templateUrl: 'authentication.html',
    controller: authComponentController,
    bindings: {
        signUpUrl: '@',
        signInUrl: '@'
      }
});

function authComponentController($scope, $element, $attrs, authService, $location) {
    const ctrl = this;
    ctrl.hasLoggedIn = false;
    
    ctrl.signin = function() {
        authService.signinUser(ctrl.signInUrl, ctrl.email, ctrl.password, function() {
            ctrl.hasLoggedIn = true;
            $location.path('/aye');
        });
    };

    ctrl.signout = function() {
        authService.signoutUser();
    };

    return ctrl;
}