const serverUrl = 'http://localhost:3090';

angular.module('ikka').constant('consts', {
  loginApi: `${serverUrl}/api/signin`,
  signupApi: `${serverUrl}/api/signup`,
  chatUrl: `${serverUrl}`,
  chatReourcePath: `/ikkachat/socket.io`,
  mostShownCategoryApi: `${serverUrl}/api/products/mostShownCategory`,
  webserviceAPI: `https://free.currencyconverterapi.com/api/v5/convert?q=USD_ILS&compact=y`,
  branchesApi: `${serverUrl}/api/branches`,
  productsApi: `${serverUrl}/api/products`,
  productsQueryApi: `${serverUrl}/api/products/query`,
  productsSearchApi: `${serverUrl}/api/products/search`,
  tweeterApi: `${serverUrl}/api/twitter`,
  twitterConsumerKey: `pQJn6sjNxuivMZMlRz6aGIqSk`,
  twitterConsumerSecret: `hRchrNrU8pv10e5HIu4eag5ZQz1J2jYPZuwv7ME6mMEnns6503`,
  twitterAccessTokenKey: `924214133867806720-2LCmCadngZ8HU7FedaBRDF3qPBZKm39`,
  twitterAccessTokenSecret: `vDdph6vAYdW41Xq95G6MR3fuRvC8xLw6MxuZwt49XnGef`,
});
