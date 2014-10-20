angular.module('PostCtrl', []).controller('PostController', function($scope) {
	// TODO: Shouldn't have to requery data (unless this page was directly linked to), should first check if we've
	// 		 already gotten the post data from the server, then lazy load it if we haven't. So no resolve on the
	//		 controller, but rather figure out how to pass data from the posts controller.
	//
	console.log("PostController initialized!");
});