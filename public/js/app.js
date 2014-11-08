var app = angular.module('app', [
	'ui.router',				// routing
	'ngResource',				// http abstraction
	'IceTagsTrayDirective', 	// tray that displays post tags on hover
	'IceScrollDirective',		// handles the scroll animation on the post view
	'IceMarkdownDirective',		// handles markdown parsing
	'IceAttributionDirective',	// handles attribution
	'AppCtrl',					// handles app level view, sidenav state management
	'PostsCtrl',				// handles the index view, displays and manages the list of posts
	'PostCtrl',					// handles a single post view
	'AboutCtrl',				// handles the about view
	'PostService',				// handles Post api interactions
	'ActivePostService',		// shares data between Posts controller and Post controller
	'ngMaterial',				// material design component set
	'ngAnimate',				// animations
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
	$uiViewScrollProvider.useAnchorScroll();
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise("/");
	$stateProvider

		// index view, display list of posts
		.state('posts', {
			url: '/',
			templateUrl: 'public/views/posts.html',
			controller: 'PostsController',
			resolve: {
				posts: function(Post) {
					return Post.query().$promise;
				}
			}
		})

		// single post view, default to hidden sidenav
		.state('post', {
			url: '/post/:publicUrl',
			templateUrl: 'public/views/post.html',
			controller: 'PostController',
			resolve: {
				post: function (ActivePost, Post, $stateParams) {
					if (ActivePost.getActivePost()) {
						return ActivePost.getActivePost();
					} else {
						return Post.get({publicUrl: $stateParams.publicUrl}).$promise;
					} 
				}
			}
		})

		// about page, accessible from image on sidenav
		.state('about', {
			url: '/about',
			templateUrl: 'public/views/about.html',
			controller: 'AboutController'
		})
});

app.constant("Constants", {
	baseTemplateUrl: "public/templates/post-templates/"
});


