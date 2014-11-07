/**
 * Controls the view for a single post. Lazy loads the post, attempts fetch a local reference from the ActivePost
 * service, which will exist if the user navigated to this view by clicking on a post card in the Posts view.
 * Otherwise, loads the post from the database.
 */
angular.module('PostCtrl', []).controller('PostController', 
	function($scope, $stateParams, $state, ActivePost, Post, Constants) {
		
		init();

		/**
		 * Fetches the post from the shared ActivePost service if it exists, otherwise tries to fetch it from the service,
		 * otherwise redirects to the index.
		 */
		function init() {
			if (ActivePost.getActivePost()) {
				$scope.post = ActivePost.getActivePost();
				initScopeFunctions();
			} else {
				Post.get({postUrl: $stateParams.postUrl}, function (post) {
					console.log(post);
					// check if this post actually exists or if we should redirect to index
					if (post.status == 404) {
						$state.go('posts');
					} else {
						$scope.post = post;
						initScopeFunctions();
					}
				});
			}
		}

		function initScopeFunctions () {

			/**
			 * Get the full public (linkable) url.
			 */
			$scope.getPublicUrl = function () {
				return "http://bokonon.me/post/" + $scope.post.publicUrl;
			}

			/**
			 * Get the full image url of a post.
			 */
			$scope.getImageUrl = function () {
				return Constants.baseTemplateUrl
						+ $scope.post.templateUrl + "/" 
						+ $scope.post.imageUrl;
			};

			/**
			 * Used to display in sharing tweets
			 */
			$scope.getFullTitle = function () {
				return $scope.title + " - " + $scope.subtitle;
			}

			$scope.getTemplateUrl = function () {
				return Constants.baseTemplateUrl + $scope.post.templateUrl + '/template.html';
			};

			$scope.getAssetsUrl = function () {
				return Constants.baseTemplateUrl + $scope.post.templateUrl + '/assets/';
			}
		}
	}
);