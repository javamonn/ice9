(function() {

  'use strict';

  angular
    .module('app')
    .controller(
      'PostsController',
      ['$scope', '$rootScope', '$state', 'ActivePost', 'posts', PostsController]
    );

  function PostsController($scope, $rootScope, $state, ActivePost, posts)  {

    init();

    function init() {
      $rootScope.title = "icenine";
      $scope.posts = posts;
    }

    $scope.goToPost = function($index) {
      var post = $scope.posts[$index];
      ActivePost.setActivePost(post);
      $scope.$emit('postSelected');
      $state.go('app.post', { publicUrl: post.publicUrl });
    };

    $scope.getImageUrl = function($index) {
      return 'posts/' + $scope.posts[$index].templateUrl + "/" + $scope.posts[$index].imageUrl;
    };
  }
})();
