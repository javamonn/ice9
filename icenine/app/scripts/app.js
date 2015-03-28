(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',                    // routing
      'ngResource',                   // http abstraction
      'ngMaterial',		      // material design component set
      'ngAnimate',		      // animations
    ])
    .config([
      '$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider',
      appConfig
    ])
    .run(['$rootScope', '$state', appRun]);

  function appRun($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function() {
      $state.go('app.posts');
    });
  }

  function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider, $mdThemingProvider) {
    $uiViewScrollProvider.useAnchorScroll();
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('app.posts');

    $stateProvider
      .state('app', {
        abstract: true,
        template: '<ui-view id="container-view" />',
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
      .state('app.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .state('app.post', {
        url: '/:publicUrl',
        templateUrl: 'views/post.html',
        controller: 'PostController',
        resolve: {
          post: function ($state, Post, $stateParams) {
            return Post.get({publicUrl: $stateParams.publicUrl}).$promise;
          }
        }
      });
  }
})();

