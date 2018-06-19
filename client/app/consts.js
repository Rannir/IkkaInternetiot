const serverUrl = 'http://localhost:3090';

angular.module('ikka').constant('consts', {
  loginApi: `${serverUrl}/api/signin`,
  signupApi: `${serverUrl}/api/signup`,
  chatUrl: `${serverUrl}`,
  chatReourcePath: `/ikkachat/socket.io`,
  productsApi: `${serverUrl}/api/products`,
  mostShownCategoryApi: `${serverUrl}/api/products/mostShownCategory`,
  webserviceAPI: `https://free.currencyconverterapi.com/api/v5/convert?q=USD_ILS&compact=y`,
});
