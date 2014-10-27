angular.module('PostsCtrl', []).controller('PostsController', function($scope, $state, posts, ActivePost) {
	
	init();

	function init () {
		$scope.posts = posts;
	}

	$scope.goToPost = function ($index) {

		// Expose the clicked post on a shared service
		var post = $scope.posts[$index];
		ActivePost.setActivePost(post);
		$state.go('post', { postUrl: post.postUrl });
	}
});