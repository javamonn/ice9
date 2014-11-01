/**
 * Directive to discreetly give attribution to pictures, quotes, anything. On hover the atttibution
 * appears in the bottom right corner of the element the ice-attribution attribute is applied to.
 */
angular.module('IceAttributionDirective', [])
	.directive('iceAttribution', function ($animate) {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {

				// find the text to use for the attribution
				if (elem.iceAttribution) {
					attrs.$observe('iceAttribution', function (val) {
						scope.attributionText = val;
					});
				} else {
					/**
					 * If the attribution is not explicitly found, assume we're applying attribution
					 * to blockquotes in markdown, where the attribution is on its own line, prefixed
					 * with a //attribution=
					 */
					 elem.find('blockquote').each(function (i, blockquote) {
					 	blockquote = $(blockquote);
					 	blockquote.addClass('ice-attribution');

					 	// build the attribution div
					 	var attribution = $('<div></div>');
					 	attribution.addClass('attribution');
				 		var rawAttributions = blockquote.find("p:contains('//attribution=')");

				 		for (var i = 0; i < rawAttributions.length; i++) {
				 			var rawAttr = $(rawAttributions[i]);
				 			var text = rawAttr.text().slice('//attribution='.length).trim();
			 				var span = $('<span></span>');
			 				span.text(text);
			 				attribution.append(span);
				 		}

				 		// replace the raw attribution lines with the constructed div
				 		blockquote.find("p:contains('//attribution=')").remove();
				 		blockquote.append(attribution);
				 		blockquote.on('mouseenter', function () {
				 			$animate.addClass(blockquote,'ice-attribution-hover');
				 			scope.$apply();

				 		});
				 		blockquote.on('mouseleave', function () {
				 			$animate.removeClass(blockquote, 'ice-attribution-hover');
				 			scope.$apply();
				 		});
					 });
				}
			}
		}
	})
	.animation('.ice-attribution', function () {
		function addClass (elem, className, done) {
			if (className != 'ice-attribution-hover') {
				done();
			} else {
				elem.find('.attribution').animate({
					width: 100,
					height: 100,
					right: 0,
					bottom: 0,
				}, 200);
				done();
			}
		}

		function removeClass (elem, className, done) {
			if (className != 'ice-attribution-hover') {
				done();
			} else {
				elem.find('.attribution').animate({
					width: 0,
					height: 0,
					right: 50,
					bottom: 50
				}, 200);
				done();
			}
		}

		return {
			addClass: addClass,
			removeClass: removeClass
		}
	});