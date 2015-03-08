(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',                // routing
      'ngResource',               // http abstraction
      'ngMaterial',		      // material design component set
      'ngAnimate',		      // animations
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
      $uiViewScrollProvider.useAnchorScroll();
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('app', {
          abstract: true,
          contoller: 'AppController'
        })
        .state('app.posts', {
          url: '/',
          templateUrl: 'public/views/posts.html',
          controller: 'PostsController',
          resolve: {
            posts: function(Post) {
              return Post.query().$promise;
            }
          }
        })
        .state('app.post', {
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
        .state('app.about', {
          url: '/about',
          templateUrl: 'public/views/about.html',
          controller: 'AboutController'
        });
    })
    .constant("Constants", {
      baseTemplateUrl: "public/templates/post-templates/"
    });
})();

