/**
 * Controls the view for a single post. Lazy loads the post, attempts fetch a local reference from the ActivePost
 * service, which will exist if the user navigated to this view by clicking on a post card in the Posts view.
 * Otherwise, loads the post from the database.
 */
angular.module('PostCtrl', []).controller('PostController', 
	function($scope, $rootScope, $stateParams, $state, ActivePost, post, Constants) {
		
		init();

		function init() {

			console.log("init");

			if (post) {
				console.log(post);
				$scope.post = post;
				$rootScope.title = $scope.post.title;
				initScopeFunctions();
				ActivePost.setActivePost(post);
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