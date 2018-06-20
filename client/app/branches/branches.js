'use strict';

angular.module('ikka').controller('branchesController', function($scope, $location, branchesService, consts) {
  const ctrl = this;

  function init() {
      branchesService.getBranches(consts.branchesApi).then(result => {
        $scope.branches = result;

        // Draw the hardcoded markers
        $scope.createMarkers($scope.branches);
        $scope.$apply();
      });
  }

  init();

  // Tel aviv latlng
  var FocusLatLng = new google.maps.LatLng({lat: 32.07, lng: 34.79});

  $scope.markers = [];

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: FocusLatLng,
    zoom: 8,
  });

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


  return ctrl;
});
