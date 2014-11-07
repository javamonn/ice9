angular.module('PostService', [])
	.factory('Post', function($resource) {
        return $resource('/api/posts/:publicUrl/', {publicUrl: '@publicUrl'});
    });