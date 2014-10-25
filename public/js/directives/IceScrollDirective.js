/**
 * Directive to animate scroll the page a certain percentage. Specifically targets the post container because ui-view
 * fucks up tradional animated scrolling methods targeting body (or even ui-view interestingly enough). If this was
 * added to any other pages you'd want a more robust way to target the container. 
 *
 * Hides the element on click or when container has been scrolled past a certain threshold, reveals the element 
 * at the same threshold when scrolling up.
 */
angular.module('IceScrollDirective', [])
	.directive('iceScroll', function ($animate) {

		var elemHeight;
		var elemWidth;
		// NOTE: This will have to be changed if this directive is used on any other page than the post page.
		var postContainer;

		var shrinkElem = function (elem) {
			elem.animate({width: 0, height: 0}, 400);
		};

		var growElem = function (elem) {
			elem.animate({width: elemWidth, height: elemHeight}, 400);
		};

		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {

				postContainer = $('#post-container');
				elemHeight = elem.height();
				elemWidth = elem.width();
				scope.elemHidden = false;

				elem.on('click', function () {
					shrinkElem(elem);
					postContainer.animate({scrollTop: postContainer.height() - 20}, 400);
					scope.elemHidden = false;
				});

				postContainer.on('scroll', function () {

					// check if we have scrolled past the threshold, hide the scroll element
					if (!scope.elemHidden && postContainer.scrollTop() >= postContainer.height()  - 300) {
						scope.elemHidden = true;
						shrinkElem(elem);
					} 
					// check if we have scrolled above the threshold, show the scroll element
					else if (scope.elemHidden && postContainer.scrollTop() <= 300) {
						scope.elemHidden = false;
						growElem(elem);
					}
				});
			}
		}
	});