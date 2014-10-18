angular.module("AppCtrl", ['ngMaterial']).controller("AppController", function ($scope, $mdSidenav) {

	$scope.init = function () {
		$mdSidenav('left').open();
	}

	$scope.toggleSidenav = function () {
		$scope.sidenavLocked = !$scope.sidenavLocked;
		$mdSidenav('left').close();
	}
});