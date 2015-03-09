/**
 * Used to share a Post object between the Posts controller and the Post controller, so
 * the post controller can avoid another GET unless it has to.
 */
(function() {
  'use strict';

  angular
    .module('app')
    .factory('ActivePost', [ActivePost]);

  function ActivePost() {
    var post;

    var setActivePost = function(p) {
      post = p;
    }

    var getActivePost = function() {
      return post;
    }

    return {
      setActivePost: setActivePost,
      getActivePost: getActivePost
    };
  }
})();
