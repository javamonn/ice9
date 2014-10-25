var app = angular.module('app', [
	'ui.router',			// routing
	'ngResource',			// http abstraction
	'IceTagsTrayDirective', // tray that displays post tags on hover
	'IceScrollDirective',	// handles the scroll animation on the post view
	'WriteCtrl',			// handles the view for creating a post
	'AppCtrl',				// handles app level view, sidenav state management
	'PostsCtrl',			// handles the index view, displays and manages the list of posts
	'PostCtrl',				// handles a single post view
	'PostService',			// handles Post api interactions
	'LoginService',			// handles Login api interactions
	'ActivePostService',	// shares data between Posts controller and Post controller
	'ngMaterial',			// material design component set
	'ngAnimate'				// animations
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
	$uiViewScrollProvider.useAnchorScroll();
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise("/");
	$stateProvider

		// index view, display list of posts
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

		// single post view, default to hidden sidenav
		.state('post', {
			url: '/post/:postUrl',
			templateUrl: 'views/post.html',
			controller: 'PostController',
		})

		// about page, accessible from image on sidenav
		.state('about', {
			url: '/about',
			templateUrl: 'views/about.html',
			controller: 'AboutController'
		})

		// view for creating a new post, requires auth
		.state('write', {
			url: '/write',
			templateUrl: 'views/write.html',
			controller: 'WriteController'
		});
});