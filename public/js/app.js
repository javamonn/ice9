var app = angular.module('app', [
	'ui.router',		// routing
	'ngResource',		// http abstraction
	'PostsCtrl',		// handles the index view, displays and manages the list of posts
	'PostCtrl',			// handles a single post view
	'PostService',		// handles Post api interactions
]);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('posts', {
			url: '/',
			templateUrl: 'views/posts.html',
			controller: 'PostsController',
			resolve: {
				posts: function(Post) {
					return Post.query().$promise;
				}
			}
		})
		.state('post', {
			url: '/:postTitle',
			templateUrl: 'views/post.html',
			controller: 'PostController',
			resolve: {
				post: function(Post) {
					return Post.get({
						title: $stateParams.postTitle
					}).$promise;
				}
			}
		});
});