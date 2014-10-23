angular.module('IceTagsTrayDirective', []).directive('iceTagsTray', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/IceTagsTray.html',
		scope: {
			tags: '@'
		}
	}
});