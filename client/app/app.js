'use strict';

const ikka = angular.module('ikka', ['toaster', 'ngResource', 'ngRoute', 'ngAnimate', 'angularSpinner', 'ngMaterial']);


ikka.config(['$routeProvider', ($routeProvider) => {
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