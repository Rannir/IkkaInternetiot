'use strict';

angular.module('ikka').
controller('loginController' , function($scope, $location, authService, consts) {
    const ctrl = this;

    ctrl.login = function() {
        authService.signinUser(consts.loginApi, ctrl.model.Email, ctrl.model.Password, function() {
            $location.path('/');
        });
    };

    return ctrl;
});