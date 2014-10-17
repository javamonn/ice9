angular.module('WriteCtrl', []).controller('WriteController', function($scope, Login) {
	
	/**
	 * Attempt to authenticate. If authenticated, store secret and reveal the writer. 
	 * If not, clear field and show error.
	 */
	$scope.auth = function(authKey) {
		console.log(authKey);
		Login.get({
			key: $scope.authKey
		}, function (res) {
			console.log(res);
			//$scope.authKey = "";
		})
	}
});