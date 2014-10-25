/**
 * Controls the view for a single post. Lazy loads the post, attempts fetch a local reference from the ActivePost
 * service, which will exist if the user navigated to this view by clicking on a post card in the Posts view.
 * Otherwise, loads the post from the database.
 */
angular.module('PostCtrl', ['duScroll']).controller('PostController', function($scope, $stateParams, $state, ActivePost, Post) {
	
	init();

	/**
	 * Fetches the post from the shared ActivePost service if it exists, otherwise tries to fetch it from the service,
	 * otherwise redirects to the index.
	 */
	function init() {
		if (ActivePost.getActivePost()) {
			$scope.post = ActivePost.getActivePost();
			console.log($scope.post);
		} else {
			Post.get({postUrl: $stateParams.postUrl}, function (post) {
				console.log(post);
				// check if this post actually exists or if we should redirect to index
				if (post.status == 404) {
					$state.go('posts');
				} else {
					$scope.post = post;
				}
			});
		}
	}

	/**
	 * Scrolls to the content div on this page.
	 */
	$scope.scrollToContent = function() {
		var old = $location.hash();
    	$location.hash('post-content');
    	$anchorScroll();
    	//reset to old to keep any additional routing logic from kicking in
    	$location.hash(old);
	}
});