angular.module('IceTagsTrayDirective', [])
	.directive('iceTagsTray', function ($animate) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/IceTagsTray.html',
			scope: {
				tags: '@'
			},
			link: function (scope, elem, attrs) {
				console.log(elem);
				var tagsDiv = elem.find('.ice-tags-icon-container');
				console.log(tagsDiv);
				tagsDiv.bind('mouseenter', function () {
					$animate.addClass(tagsDiv, 'tray-expanded');
					console.log("add");
					scope.$apply();
				});
				tagsDiv.bind('mouseleave', function () {
					$animate.removeClass(tagsDiv, 'tray-expanded');
					console.log("remove");
					scope.$apply();
				});
			}
		}
	});