angular.module('PostsCtrl', []).controller('PostsController', function($scope, $state, posts) {
	
	init();

	function init () {
		$scope.posts = posts;
	}

	$scope.goToPost = function(url) {
		console.log("going to: " + url);
		$state.go('post', { postUrl: url });
	}
});