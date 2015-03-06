(function() {
  'use strict';

  angular
    .module('app')
    .directive('iceMarkdown', [IceMarkdownDirective]);

  function IceMarkdownDirective() {
    return {
      restrict: 'AE',
      link: function (scope, elem, attrs) {
        if (elem.iceMarkdown) {
          attrs.$observe('iceMarkdown', function (val) {
            elem.html(marked(val));
          });
        } else {
          elem.html(marked(elem.text()));
        }
      }
    }
  }

})();
