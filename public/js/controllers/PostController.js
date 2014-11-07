/**
 * Controls the view for a single post. Lazy loads the post, attempts fetch a local reference from the ActivePost
 * service, which will exist if the user navigated to this view by clicking on a post card in the Posts view.
 * Otherwise, loads the post from the database.
 */
angular.module('PostCtrl', []).controller('PostController', 
	function($scope, $rootScope, $stateParams, $state, ActivePost, Post, Constants) {
		
		init();

		/**
		 * Fetches the post from the shared ActivePost service if it exists, otherwise tries to fetch it from the service,
		 * otherwise redirects to the index.
		 */
		function init() {
			if (ActivePost.getActivePost()) {
				$scope.post = ActivePost.getActivePost();
				$rootScope.title = $scope.post.title;
				initScopeFunctions();
			} else {
				Post.get({publicUrl: $stateParams.postUrl}, function (post) {
					// check if this post actually exists or if we should redirect to index
					if (post.status == 404) {
						console.log($stateParams.postUrl);
					} else {
						$scope.post = post;
						$rootScope.title = post.title;
						ActivePost.setActivePost(post);
						initScopeFunctions();
					}
				});
			}
		}

		function getPublicUrl() {
			return "http://bokonon.me/post/" + $scope.post.publicUrl;			
		}

		function initScopeFunctions () {

			$scope.getShareTumblrUrl = function () {
				return "http://www.tumblr.com/share/link?" +
					"url=" + encodeURIComponent(getPublicUrl()) +
					"&name=" + encodeURIComponent($scope.post.title) +
					"&description=" + encodeURIComponent($scope.post.subtitle + ".");		
			}

			$scope.getSharePlusUrl = function () {
				return "https://plus.google.com/share?" +
					"url=" + encodeURIComponent(getPublicUrl());
			}

			$scope.getShareTwitterUrl = function () {
				return "https://twitter.com/intent/tweet?" +
					"url=" + encodeURIComponent(getPublicUrl()) +
					"&text=" + encodeURIComponent($scope.post.title + " - " + $scope.post.subtitle) +
					"&via=dann_ramm";
			}

			/**
			 * Get the full image url of a post.
			 */
			$scope.getImageUrl = function () {
				return Constants.baseTemplateUrl
						+ $scope.post.templateUrl + "/" 
						+ $scope.post.imageUrl;
			};

			$scope.getTemplateUrl = function () {
				return Constants.baseTemplateUrl + $scope.post.templateUrl + '/template.html';
			};

			$scope.getAssetsUrl = function () {
				return Constants.baseTemplateUrl + $scope.post.templateUrl + '/assets/';
			}
		}
	}
);