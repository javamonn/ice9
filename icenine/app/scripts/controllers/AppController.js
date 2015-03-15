(function() {
  'use strict';

  angular
    .module('app')
    .controller(
      'AppController',
      ['$scope', '$rootScope', '$mdSidenav', '$state', AppController]
    );

  function AppController($scope, $rootScope, $mdSidenav, $state) {
    $rootScope.isSidenavOpen = true;
    $rootScope.toggleSidenav = function() {
      console.log('toggle');
      $rootScope.isSidenavOpen = !$rootScope.isSidenavOpen;
    }
  }
})();
