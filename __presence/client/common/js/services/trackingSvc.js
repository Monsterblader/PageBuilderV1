(function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.service.TrackingSvc
   * @description
   * # TrackingSvc
   * Service to handle tracking API calls and data persistence
   */
  angular.module('narvar').service('TrackingSvc', ['$resource', '$cacheFactory', 'R',
    function ($resource, $cacheFactory, R) {
      var svc = this;

      /**
       * Internal cache to store API responses.
       * @type {{data: *, ttl: number, expires: Date}}
       */
      svc.cache = {
        data    : $cacheFactory('TrackingSvc'),
        ttl     : 3600,
        expires : new Date() // Expired on init so first resource call will seed cache
      };

      svc.resources = {

        /**
         * Grab the tracking information from the server.
         * @todo this is a placeholder, remove before delivery
         */
        tracking : $resource('/api/v0.0.0/tracking', null, {
          'get' : {

            /**
             * Request method.
             * @type {String}
             */
            method : 'GET',

            /**
             * Scrub the data before sending it back to the controller.
             * @param data
             * @returns {*}
             */
            transformResponse : function (data) {
              data = JSON.parse(data);
              svc.cache.data.put('tracking', data);
              return data;
            }
          }

        }) // End tracking
      };

      return svc;
    }]);
}(angular));
