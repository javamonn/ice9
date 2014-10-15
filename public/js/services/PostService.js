angular.module('PostService', ['ngResource'])
	.factory('Post', function($resource) {
        return $resource('/api/posts/:id/', {'id': '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    });