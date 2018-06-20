angular.module('ikka').service('managementService', function($http) {
    const svc = this;
    
    svc.getFinanceData = async function(url) {
        
        return $http.get(url).then(result => {
            return result.data.USD_ILS.val;
        });
    };

    svc.postTweet = async function(url, tweet) {

        return $http.post(url, {tweet: tweet}).then(result => {
            return result.data;
        });
    };

    return svc;
});
  