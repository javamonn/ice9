(function() {
  angular
    .module('app')
    .controller(
      'AboutController',
      ['$scope', '$rootScope', AboutController]
    );

  function AboutController($scope, $rootScope) {
    $rootScope.title = "icenine - about";
  };

})();
