angular.module('PostsCtrl', []).controller('PostsController', function($scope, posts) {
	
	init();

	function init () {
		$scope.posts = posts;
		console.log($scope);	
	}
});