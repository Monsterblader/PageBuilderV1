(function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.controller.MainCtrl
   * @description
   * # MainCtrl
   * Main controller for the home page
   */
  angular.module('narvar').controller('MainCtrl', ['TrackingSvc',
    function (TrackingSvc) {

      this.trackingSvc = TrackingSvc;

    }]);

}(angular));
