(function() {
  'use strict';

  angular
    .module('app')
    .controller(
      'AppController',
      ['$scope', '$mdSidenav', '$state', AppController]
    );

  function AppController($scope, $mdSidenav, $state) {

    $scope.init = function () {
      $scope.sidenavVisible = true;
      $mdSidenav('left').open();

      $scope.$on('postSelected', function () {
        if ($scope.sidenavVisible) {
          $scope.toggleSidenav();
         }
      });
    };

    $scope.toggleSidenav = function () {
      $mdSidenav('left').toggle();
      $scope.sidenavVisible = !$scope.sidenavVisible;
    };

    $scope.goToAbout = function () {
      $scope.toggleSidenav();
      $state.go('about');
    };
  }
})();
