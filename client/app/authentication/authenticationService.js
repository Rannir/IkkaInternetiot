'use strict';

const ikkaAuth = angular.module('ikkaAuth', ['ngResource', 'ngRoute', 'ngMaterial']);

ikkaAuth.service('authService', function($http) {
    const srvc = this;
    let hasLoggedIn = false;

    if(!angular.isUndefinedOrNull(window.localStorage.getItem('token'))) {
        hasLoggedIn = true;
    }

    const signinOrUpuser = function(url, email, password, userName, onDoneFunc) {
        $http.post(url, {email, password, userName}).then(function({data}) {
            hasLoggedIn = true;
            // - Save the JWT token
            window.localStorage.setItem('token', data.token);

            if(onDoneFunc)
                onDoneFunc();
        });
    };

    srvc.hasUserAuthenticated = function() {
        return hasLoggedIn;
    };

    srvc.signupUser = function(signUpUrl, email, password, userName, onDoneFunc) {
        signinOrUpuser(signUpUrl, email, password, userName, onDoneFunc);
    };

    srvc.signinUser = function(signInUrl, email, password, onDoneFunc) {
        signinOrUpuser(signInUrl, email, password, null, onDoneFunc);
    };

    srvc.signoutUser = function() {
        window.localStorage.removeItem('token');
        hasLoggedIn = false;
    };

    srvc.getUserName = function() {

    };

    srvc.getUserToekn = function() {

    };

    return srvc;
});