(function() {
  'use strict';

  angular.module('narvar', [

    // Core modules
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngMaterial',

    // Custom modules (app/modules/*)
    'ramda'
  ]).config(['$routeProvider', '$httpProvider', '$locationProvider', '$mdThemingProvider',
    function($routeProvider, $httpProvider, $locationProvider, $mdThemingProvider) {
      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('FlashSvcInterceptor');

      var shippingPromise = ['$q', 'R', 'ShippingSvc', function($q, R, ShippingSvc) {

        var deferred = $q.defer();

        ShippingSvc.resources.shipping.get(function(response) {
          ShippingSvc.shipping = R.prop('data', response);
          deferred.resolve();
        });

        return deferred.promise;
      }];

      $routeProvider.
        //when('/', {
        //  templateUrl : '/pages/index',
        //  controller  : 'MainCtrl as mainCtrl'
        //}).
        when('/shipping', {
          templateUrl    : '/pages/shipping',
          controller     : 'ShippingCtrl as shippingCtrl',
          resolve        : {
            shipping : shippingPromise
          },
          reloadOnSearch : false
        }).
        when('/shipping/:trackingNumber', {
          templateUrl    : '/pages/shipping',
          controller     : 'ShippingCtrl as shippingCtrl',
          resolve        : {
            shipping : shippingPromise
          },
          reloadOnSearch : false
        }).
        otherwise({
          redirectTo : '/'
        });

      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('blue-grey');

    }]);

}());
