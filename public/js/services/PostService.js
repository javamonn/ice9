angular.module('PostService', ['ngResource'])
	.factory('Post', function($resource) {
        return $resource('/api/posts/:url/', {url: '@postUrl'}, {
            update: {
                method: 'PUT'
            }
        });
    });