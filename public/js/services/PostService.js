angular.module('PostService', [])
	.factory('Post', function($resource) {
        return $resource('/api/posts/:postUrl/', {postUrl: '@postUrl'}, {
            update: {
                method: 'PUT'
            }
        });
    });