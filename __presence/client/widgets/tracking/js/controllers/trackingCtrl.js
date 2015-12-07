(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name narvar.controller:TrackingCtrl
   * @description
   * # TrackingCtrl
   * Tracking controller
   */
  angular.module('narvar').controller('TrackingCtrl', ['$sce', '$timeout', '$routeParams', 'TrackingSvc', 'LocationSvc', 'R',
    function($sce, $timeout, $routeParams, TrackingSvc, LocationSvc, R) {
      var trackingCtrl = this;

      trackingCtrl.trackingSvc = TrackingSvc;

      trackingCtrl.trustHtml = function(html) {
        return $sce.trustAsHtml(html);
      };

      trackingCtrl.close = function() {
        trackingCtrl.trackingSvc.visible = false;
        LocationSvc.skipReload().path('/tracking');
      };
    }]);

}(angular));
