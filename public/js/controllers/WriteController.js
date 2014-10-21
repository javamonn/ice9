angular.module('WriteCtrl', []).controller('WriteController', function($scope, $state, Login, Post) {

	var authenticated;
	var preview;

	init();

	function init() {
		authenticated = false;
		preview = false;
	}

	$scope.showAuthenticate = function () {
		return !authenticated;
	}

	$scope.showPreview = function () {
		return authenticated && preview; 
	}

	$scope.showEdit = function () {
		return authenticated && !preview;
	}

	/**
	 * Attempt to authenticate. If authenticated, store secret and reveal the writer. 
	 * If not, clear field and show error.
	 */
	$scope.auth = function () {
		Login.get({
			key: $scope.authKey
		}, function (res) {
			if(res.status != 401) {
				// show the write view
				authenticated = true;
			}
		});
	};

	/**
	 * Display a preview showing the curent information in a card and the post.
	 */
	 $scope.preview = function () {
	 	preview = true;
	 }

	/**
	 *
	 */
	 $scope.edit = function () {
	 	preview = false;
	 }

	/**
	 * Save post.
	 */
	$scope.post = function() {

		if ($scope.postTags != null && $scope.postTags.length > 0) {
			var postTags = $scope.postTags.split(',');
			for (var i = 0; i < postTags.length; i++) {
				postTags[i] = postTags[i].trim();
			}
		}

		var post = new Post({
			title: $scope.postTitle,
			subtitle: $scope.postSubtitle,
			content: $scope.postContent,
			imgUrl: $scope.imgUrl,
			postUrl: $scope.postTitle.toLowerCase().split(' ').join('_'),
			tags: postTags,
			key: $scope.authKey
		});
		post.$create();
		$state.go('posts');
	}
});