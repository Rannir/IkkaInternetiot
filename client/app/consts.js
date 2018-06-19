const serverUrl = 'http://localhost:3090';

angular.module('ikka').constant('consts', {
  loginApi: `${serverUrl}/api/signin`,
  signupApi: `${serverUrl}/api/signup`,
  chatUrl: `${serverUrl}`,
  chatReourcePath: `/ikkachat/socket.io`,
  productsApi: `${serverUrl}/api/products`,
  mostShownCategoryApi: `${serverUrl}/api/products/mostShownCategory`,
   branchesApi: `${serverUrl}/api/branches`
});
