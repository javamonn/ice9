angular.module('IceTagsTrayDirective', [])
	.directive('iceTagsTray', function ($animate) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/IceTagsTray.html',
			scope: {
				tags: '='
			},
			link: function (scope, elem, attrs) {
				scope.trayExpanded = false;
				for (var i = 0; i < scope.tags.length; i++) {
					scope.tags[i] = scope.tags[i].toUpperCase();
				}
				elem.bind('mouseenter', function () {
					scope.trayExpanded = true;
					$animate.addClass(elem, 'tray-expanded');
					scope.$apply();
				});
				elem.bind('mouseleave', function () {
					scope.trayExpanded = false;
					$animate.removeClass(elem, 'tray-expanded');
					scope.$apply();
				});
			}
		}
	})

	/**
	 * JS animations to expand and contract the tray, the icon rotation is handled in CSS. 
	 */
	.animation('.ice-tags-tray', function () {
		var expandTray = function (elem, className, done) {
			var TAG_PADDING = 5;
			var EDGE_PADDING = 2.5;
			var totalWidth = 0;

			// measure the width of the tag element divs
			var tags = elem.find('.tags');
			tags.children().each(function(index, element) {
				totalWidth += parseInt($(element).css('width'));
			});

			// add the padding width between tag elements
			totalWidth += ((tags.length - 1) * TAG_PADDING);

			// add edge padding
			totalWidth += (EDGE_PADDING * 2);

			// animate the tagsTray expansion
			tags.animate({
				width: totalWidth
			}, 500);

		}

		var contractTray = function (elem, className, done) {
			var tags = elem.find('.tags');

			tags.animate({
				width: 0
			}, 500);
		}


		return {
			addClass: expandTray,
			removeClass: contractTray
		}
	});