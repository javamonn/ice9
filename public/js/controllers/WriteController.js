angular.module('WriteCtrl', []).controller('WriteController', function($scope, Login) {
	
	// secret returned on successful auth, validated server side when attempting to post.
	// This ensures that even if someone sets the authenticated var on scope, they won't
	// be able to post with the secret from the server.
	var secret = "";


	/**
	 * Attempt to authenticate. If authenticated, store secret and reveal the writer. 
	 * If not, clear field and show error.
	 */
	$scope.auth = function() {
		Login.get({
			key: $scope.authKey
		}, function (res) {
			if(res.status != 401) {
				// show the write view
				$scope.authenticated = true;
				console.log(res);
			}
			$scope.authKey = "";
		})
	};

	$scope.post = function() {
		var post = new Post({
			title: $scope.postTitle,
			subtitle: $scope.postSubtitle,
			content: $scope.postContent,
			tags: $scope.postTags.split(','),
			secret: secret
		});
		post.save(function (res) {
			console.log(res);
		});
	}
});