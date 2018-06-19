'use strict';

angular.module('ikka').controller('branchesController', function($scope, $location, branchesService, consts) {
    const ctrl = this;
    
    $scope.branches = [{ id: 1, name: "Eden", address: "Azrieli", city: "tel aviv", lat: -25.444, lng: 131.036 },
        { id: 1, name: "Baree", address: "Azrieli", city: "tel aviv", lat: -25.444, lng: 131.036 }];

    return ctrl;



 //branchesService.getBranches(consts.branchesApi).then(branches => {
 // $scope.branches = branches;
 // $scope.$apply();

 //   createMarkers(branches);
 //   });

    $scope.createMarkers = () => {
        for (var branch of $scope.branches) {
            var marker = new google.maps.Marker({ position: branch, map: map });
        }
    };
 
  return ctrl;
});