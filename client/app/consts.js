'use strict';

const serverUrl = 'http://localhost:3090';

angular.module('ikka').
constant('consts', {
    loginApi: `${serverUrl}/api/signin`,
    signupApi: `${serverUrl}/api/signup`,
    chatUrl : `${serverUrl}`,
    chatReourcePath: `/ikkachat/socket.io`
});