angular.module('ikka').service('managementService', function($http) {
    const svc = this;
  
    
    svc.getFinanceData = async function(url) {
        
        return $http.get(url).then(result => {
            return result.data.USD_ILS.val;
        });
    };
  
    return svc;
  });
  