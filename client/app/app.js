'use strict';

const ikka = angular.module('ikka', ['toaster', 'ngResource', 'ngRoute', 'ngAnimate', 'angularSpinner', 'ngMaterial', 'ikkaAuth']);


ikka.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    
    $locationProvider.hashPrefix('');

    $routeProvider.when('/',
    {
        templateUrl: /*!*/ 'HTML/main.html',
        controller: 'mainController',
        controllerAs: 'ctrl'
    })
}]);

ikka.config = {
    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY',
        'chromeOptions': {
            'args': ['lang=utf8']
        }
    }
}