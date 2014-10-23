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
				var tagsDiv = elem.find('.ice-label-icon');
				console.log(tagsDiv);
				tagsDiv.bind('mouseenter', function () {
					$animate.addClass(tagsDiv, 'tray-expanded');
					scope.$apply();
				});
				tagsDiv.bind('mouseleave', function () {
					$animate.removeClass(tagsDiv, 'tray-expanded');
					scope.$apply();
				});
			}
		}
	})
	/**
	 * JS animations to expand and contract the tray, the icon rotation is handled in CSS. 
	 */
	.animation('.tray-expanded', function () {
		var expandTray = function (elem, className, done) {

		}

		var contractTray = function (elem, className, done) {

		}


		return {
			addClass: expandTray,
			removeClass: contractTray
		}
	});