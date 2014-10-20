/**
 * Controls the view for a single post. Lazy loads the post, attempts fetch a local reference from the ActivePost
 * service, which will exist if the user navigated to this view by clicking on a post card in the Posts view.
 * Otherwise, loads the post from the database.
 */
angular.module('PostCtrl', []).controller('PostController', function($scope, $stateParams, ActivePost, Post) {
	
	init();

	function init() {
		if (ActivePost.getActivePost()) {
			$scope.post = ActivePost.getActivePost();
		} else {
			Post.get({postUrl: $stateParams.postUrl}).$promise.then(function (post) {
				$scope.post = post;
			});
		}
	}
});