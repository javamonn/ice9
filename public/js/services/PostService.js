(function() {
  'use strict';

  angular
    .module('app')
    .factory('Post', ['$resource', PostFactory]);

  function PostFactory($resource) {
    return $resource('/api/posts/:publicUrl/', {publicUrl: '@publicUrl'});
  }

})();
