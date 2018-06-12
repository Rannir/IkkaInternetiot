'use strict';

const serverUrl = 'http://localhost:3090';

angular.module('ikka').
constant('consts', {
    loginApi: `${serverUrl}/signin`,
    signupApi: `${serverUrl}/signup`
});