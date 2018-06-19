'use strict';

angular.module('ikka').controller('branchesController', function($scope, $location, branchesService, consts) {
  const ctrl = this;

  // Tel aviv latlng
  var FocusLatLng = new google.maps.LatLng({lat: 32.07, lng: 34.79});

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: FocusLatLng,
    zoom: 8,
  });

  $scope.branches = [
    {id: 1, name: 'Eden', address: 'Azrieli', city: 'tel aviv', lat: 32.17, lng: 34.79},
    {id: 1, name: 'Baree', address: 'Azrieli', city: 'tel aviv', lat: 31.97, lng: 34.78},
  ];

  $scope.createMarkers = () => {
    for (var branch of $scope.branches) {
      var marker = new google.maps.Marker({position: branch, map: $scope.map});
      //marker.setMap($scope.map);
      $scope.markers.add(marker);
      alert('g');
    }
  };

  $scope.clearMarkers = () => {
    for (var marker of $scope.markers) {
      marker.setMap(null);
    }
  };

  //createMarkers(branches);

  return ctrl;

  //branchesService.getBranches(consts.branchesApi).then(branches => {
  // $scope.branches = branches;
  // $scope.$apply();

  //   createMarkers(branches);
  //   });

  return ctrl;
});
