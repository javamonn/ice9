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

    $rootScope.toggleSidenav = function($event) {
      if (!$rootScope.isMobile()) {
        $rootScope.isSidenavOpen = !$rootScope.isSidenavOpen;
      }
    };

    $rootScope.isMobile = function() {
      return matchmedia.is('(max-width: 775px)');
    };

    matchmedia.on('(max-width: 1000px)', function(mediaQueryList) {
      if (mediaQueryList.matches) {
        $rootScope.isSidenavOpen = false;
      }
    });

    matchmedia.on('(max-width: 775px)', function(mediaQueryList) {
      // noop -- .on triggers $apply
    });

  }
})();
