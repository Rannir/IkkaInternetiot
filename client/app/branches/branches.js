'use strict';

angular.module('ikka').controller('branchesController', function($scope, $location, branchesService, consts) {
  const ctrl = this;

  // Tel aviv latlng
  var FocusLatLng = new google.maps.LatLng({lat: 32.07, lng: 34.79});

  $scope.markers = [];

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: FocusLatLng,
    zoom: 8,
  });

  $scope.branches = [
    {id: 1, name: 'FashionMall', address: 'Rothshild 23', city: 'Tel aviv', lat: 32.17, lng: 34.79},
    {id: 2, name: 'Baree', address: 'Azrieli', city: 'Tel aviv', lat: 31.97, lng: 34.78},
    {id: 3, name: 'Igor', address: 'sderot katzir 2', city: 'Tel aviv', lat: 31.97, lng: 34.79},
    {id: 4, name: 'ILoveFlex', address: 'golda 7', city: 'Ashdod', lat: 31.8, lng: 34.6434},
    {id: 5, name: 'Angularia', address: 'sderot katzir 2', city: 'Raanana', lat: 32.1836, lng: 34.87386},
  ];

  $scope.createMarkers = branches => {
    $scope.clearMarkers();

    for (var branch of branches) {
      var marker = new google.maps.Marker({position: branch, map: $scope.map});

      $scope.markers.push(marker);
    }
  };

  $scope.clearMarkers = () => {
    for (var marker of $scope.markers) {
      marker.setMap(null);
    }

    $scope.markers = [];
  };

  // Draw the hardcoded markers
  $scope.createMarkers($scope.branches);

  return ctrl;

  //branchesService.getBranches(consts.branchesApi).then(branches => {
  // $scope.branches = branches;
  // $scope.$apply();

  //   createMarkers(branches);
  //   });

  return ctrl;
});
