angular.module('LoginService', ['ngResource'])
	.factory('Login', function($resource) {
        return $resource('/api/login/:key', {'key': '@key'});
    });