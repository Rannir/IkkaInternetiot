'use strict';

angular.module('ikka').controller('branchesController', function($scope, $location, branchesService, consts) {
    const ctrl = this;
    
    $scope.branches = [{ id: 1, name: "Eden", address: "Azrieli", city: "tel aviv", lat: -25.444, lng: 131.036 },
        { id: 1, name: "Baree", address: "Azrieli", city: "tel aviv", lat: -25.444, lng: 131.036 }];

    return ctrl;
    $scope.createMarkers = () => {
        for (var branch of $scope.branches) {
            var marker = new google.maps.Marker({ position: branch, map: map });
        }
    };

    /*
  //branchesService.getBranches(consts.productsApi).then(branches => {
  //  $scope.branches = branches;
  //  $scope.$apply();

    createMarkers(branches);
  //});
  */
  return ctrl;
});