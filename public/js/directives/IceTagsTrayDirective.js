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
				var tagsDiv = elem.find('.ice-label-icon');
				tagsDiv.bind('mouseenter', function () {
					scope.trayExpanded = true;
					$animate.addClass(tagsDiv, 'tray-expanded');
					scope.$apply();
				});
				tagsDiv.bind('mouseleave', function () {
					scope.trayExpanded = false;
					$animate.removeClass(tagsDiv, 'tray-expanded');
					scope.$apply();
				});
			}
		}
	})

	/**
	 * JS animations to expand and contract the tray, the icon rotation is handled in CSS. 
	 */
	.animation('.tags-tray', function () {
		var expandTray = function (elem, className, done) {
			var TAG_PADDING = 5;
			var EDGE_PADDING = 2.5;
			var totalWidth = 0;

			// measure the width of the tag element divs
			var tags = elem.children('span');
			console.log(tags);
			tags.each(function(index, element) {
				totalWidth += parseInt($(element).css('width'));
			});

			// add the padding width between tag elements
			totalWidth += ((tags.length - 1) * TAG_PADDING);

			// add edge padding
			totalWidth += (EDGE_PADDING * 2);

			console.log(totalWidth);
			// animate the tray expansion
			elem.animate({
				backgroundColor: 'rgba(0, 0, 0, .12)',
				width: totalWidth
			}, 500);

		}

		var contractTray = function (elem, className, done) {
			elem.animate({
				backgroundColor: '#FFF',
				width: 0
			}, 500);
		}


		return {
			addClass: expandTray,
			removeClass: contractTray
		}
	});