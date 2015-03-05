angular.module('PostsCtrl', [])
angular
  .module('app')
  .controller(
    'PostsController',
    ['$scope', '$rootScope', '$state', 'ActivePost', 'Constants', 'posts', PostsController]

  function PostsController($scope, $rootScope, $state, ActivePost, Constants, posts)  {

    init();

    function init() {
      $rootScope.title = "icenine";
      $scope.posts = posts;
    }

    $scope.goToPost = function($index) {

      // Expose the clicked post on a shared service
      var post = $scope.posts[$index];
      ActivePost.setActivePost(post);
      $scope.$emit('postSelected');
      $state.go('post', { publicUrl: post.publicUrl });
    }


    /**
    * Get the full image url of a post.
    */
    $scope.getImageUrl = function($index) {
      return Constants.baseTemplateUrl + $scope.posts[$index].templateUrl + "/" + $scope.posts[$index].imageUrl;
    }
  }
});
