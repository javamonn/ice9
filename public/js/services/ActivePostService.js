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

    var activePost = {

      /**
       * Set the active post. Should be called by the Posts controller right before
       * transitioning to the Post controller.
       */
      setActivePost: function(p) {
        post = p;
      },

      /**
       * Get the active post. Should be called by the Post controller on startup, use
       * this reference if it exists, otherwise GET post.
       */
      getActivePost: function() {
         return post;
      }
    };
    return activePost;
  }

}();
