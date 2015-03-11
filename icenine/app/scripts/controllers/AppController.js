(function() {
  'use strict';

  angular
    .module('app')
    .controller(
      'AppController',
      ['$scope', '$mdSidenav', '$state', AppController]
    );

  function AppController($scope, $mdSidenav, $state) {
    // manage global app state
  }
})();
