'use strict';

angular.module('ikka').
controller('indexController' , function($scope, $location, toaster, authService) {
    const ctrl = this;
    
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