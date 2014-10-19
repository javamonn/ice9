var app = angular.module('app', [
	'ui.router',			// routing
	'ngResource',			// http abstraction
	'WriteCtrl',			// handles the view for creating a post
	'AppCtrl',				// handles app level view, sidenav state management
	'PostsCtrl',			// handles the index view, displays and manages the list of posts
	'PostCtrl',				// handles a single post view
	'PostService',			// handles Post api interactions
	'LoginService',			// handles Login api interactions
	'ngMaterial',			// material design component set
	'ngAnimate',			// animations
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise("/");
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
			url: '/post/:postUrl',
			templateUrl: 'views/post.html',
			controller: 'PostController',
			resolve: {
				post: function(Post) {
					return Post.get({
						postUrl: $stateParams.postUrl
					}).$promise;
				}
			}
		})
		.state('write', {
			url: '/write',
			templateUrl: 'views/write.html',
			controller: 'WriteController'
		});
});