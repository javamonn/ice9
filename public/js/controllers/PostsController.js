angular.module('PostsCtrl', []).controller('PostsController', function($scope, $state, posts, ActivePost, Constants) {
	
	init();

	function init () {
		$scope.posts = posts;
	}

	$scope.goToPost = function ($index) {

		// Expose the clicked post on a shared service
		var post = $scope.posts[$index];
		ActivePost.setActivePost(post);
		$state.go('post', { postUrl: post.publicUrl });
	}


	/**
	 * Get the full image url of a post.
	 */
	$scope.getImageUrl = function ($index) {
		return Constants.baseTemplateUrl + $scope.posts[$index].templateUrl + "/" + $scope.posts[$index].imageUrl;
	}
});