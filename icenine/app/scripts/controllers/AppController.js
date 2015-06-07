(function() {
  'use strict';

  angular
    .module('app')
    .controller(
      'AppController',
      ['$scope', '$rootScope', '$mdSidenav', '$state', 'matchmedia', AppController]
    );

  function AppController($scope, $rootScope, $mdSidenav, $state, matchmedia) {
    $rootScope.isSidenavOpen = true;
    $rootScope.toggleSidenav = function() {
      $rootScope.isSidenavOpen = !$rootScope.isSidenavOpen;
    };

    matchmedia.on('(max-width: 1000px)', function(mediaQueryList) {
      if (mediaQueryList.matches) {
        $rootScope.isSidenavOpen = false;
      }
    });
  }
})();
