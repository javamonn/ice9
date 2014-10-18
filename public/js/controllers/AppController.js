angular.module("AppCtrl", []).controller("AppController", function ($scope, $mdSidenav) {

	$scope.init = function () {
		$scope.sidenavVisible = true;
		$mdSidenav('left').open();
	}

	$scope.toggleSidenav = function () {
		$mdSidenav('left').toggle();
		$scope.sidenavVisible = !$scope.sidenavVisible;
	}
});