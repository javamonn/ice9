(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',                // routing
      'ngResource',               // http abstraction
      'ngMaterial',		      // material design component set
      'ngAnimate',		      // animations
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider', appConfig]);

  function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
    $uiViewScrollProvider.useAnchorScroll();
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('app.posts');

    $stateProvider
      .state('app', {
        abstract: true,
        template: '<ui-view />',
        controller: 'AppController'
      })
      .state('app.posts', {
        url: '/',
        templateUrl: 'views/posts.html',
        controller: 'PostsController',
        resolve: {
          posts: function(Post) {
            return Post.query().$promise;
          }
        }
      })
      .state('app.post', {
        url: '/post/:publicUrl',
        templateUrl: 'views/post.html',
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
      .state('app.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      });
  }
})();

