'use strict';

const ikkaAuth = angular.module('ikkaAuth', ['ngResource', 'ngRoute', 'ngMaterial']);

ikkaAuth.service('authService', function($http) {
  const srvc = this;
  let hasLoggedIn = false;

  if (!angular.isUndefinedOrNull(window.localStorage.getItem('ikatoken'))) {
    hasLoggedIn = true;
  }

  const signinOrUpuser = function(url, email, password, userName, onDoneFunc) {
    $http.post(url, {email, password, userName}).then(function({data}) {
      // - Save the JWT token
      window.localStorage.setItem('ikatoken', data.token);
      window.localStorage.setItem('ikausrname', data.userName);

      if (data.isAdmin) window.localStorage.setItem('ikaisadmin', data.isAdmin);

      hasLoggedIn = true;

      if (onDoneFunc) onDoneFunc();
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
    window.localStorage.removeItem('ikatoken');
    window.localStorage.removeItem('ikausrname');
    window.localStorage.removeItem('ikaisadmin');
    hasLoggedIn = false;
  };

  srvc.getUserName = function() {
    return window.localStorage.getItem('ikausrname');
  };

  srvc.getIsAdmin = function() {
    return window.localStorage.getItem('ikaisadmin');
  };

  srvc.getUserToken = function() {
    return window.localStorage.getItem('ikatoken');
  };

  return srvc;
});
