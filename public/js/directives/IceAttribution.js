/**
 * Directive to discreetly give attribution to pictures, quotes, anything. On hover the atttibution
 * appears in the bottom right corner of the element the ice-attribution attribute is applied to.
 */
(function() {
  'use strict';

  angular
    .module('app')
    .directive('iceAtrribution', ['$animate', IceAttributionDirective])
    .animation('.ice-attribution', [IceAttributionAnimation]);

  function IceAttributionDirective() {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {

        // find the text to use for the attribution
        if (attrs.iceAttribution.length > 0) {
          elem.addClass('ice-attribution');
          elem.css({
            position: 'relative'
          });
          attrs.$observe('iceAttribution', function (val) {

            // remove existing attribution element
            elem.find('.attribution').remove();

            // build attribution
            var attribution = $('<div></div>');
            attribution.addClass('attribution');

            var lines = val.split('\n');
            for (var i = 0; i < lines.length; i++) {
              var span = $('<span></span>');
              span.text(lines[i]);
              attribution.append(span);
            }
            elem.append(attribution);
          });

          elem.on('mouseenter', function () {
            $animate.addClass(elem,'ice-attribution-hover');
            scope.$apply();
          });

          elem.on('mouseleave', function () {
            $animate.removeClass(elem, 'ice-attribution-hover');
            scope.$apply();
          });

  } else {
          /**
           * If the attribution is not explicitly found, assume we're applying attribution
           * to blockquotes in markdown, where the attribution is on its own line, prefixed
           * with a //attribution=
           */
           elem.find('blockquote').each(function (i, blockquote) {
              blockquote = $(blockquote);

              if (blockquote.find("p:contains('//attribution=')").length == 0) {
                return false;
              }

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

  }
  function IceAttributionAnimation() {
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
  }

})();
