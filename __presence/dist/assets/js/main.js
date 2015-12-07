(function() {
  'use strict';

  angular.module('ramda', [])
    .service('R', ['$window', function($window) {
      return $window.R;
    }]);

}());

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

(function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.service.FlashSvc
   * @description
   * # FlashSvc
   * Service for flash messages
   */
  angular.module('narvar').service('FlashSvc', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
      var svc = this;

      /**
       * Fetch any flash messages on the root scope.
       * @param key
       * @returns {*}
       */
      svc.getFlash = function (key) {
        var flash = $rootScope.flash;
        return (key) ? flash[key] : flash;
      };

      /**
       * Set the flash with new messages.
       * @param flash
       */
      svc.setFlash = function (flash) {
        var key;

        for (key in flash) {
          if (flash.hasOwnProperty(key) && Array.isArray(flash[key])) {
            $rootScope.flash[key] = flash[key].concat();
          }
        }

        // This lets us spam the flash message and have it toast every time.
        $timeout(svc.clearFlash);
      };

      /**
       * Resets the flash message object.
       * @returns {narvar.service.FlashSvc}
       */
      svc.clearFlash = function () {
        $rootScope.flash = {
          notice : [],
          error  : []
        };
        return svc;
      };

      return svc;
    }]).service('FlashSvcInterceptor', ['FlashSvc', function (FlashSvc) {
    return {
      'response' : function (res) {
        FlashSvc.setFlash(res.data.flash);
        return res;
      }
    };


  }]);
}(angular));

(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.factory.locationSvc
   * @description
   * # locationSvc
   * Original: https://github.com/angular/angular.js/issues/1699#issuecomment-22511464
   *
   * Usage:
   *
   * (interception is needed for Back/Forward buttons to work)
   *
   * location.intercept($scope._url_pattern, function(matched) {
   *   * can return false to abort interception
   *   var type = matched[1]
   *   if (!type) {
   *     return;
   *   }
   *   $scope.safeApply(function() {
   *     $scope.data_type = type;
   *     $scope.params.page = 1;
   *     $scope.get_data();
   *   });
   * });
   *
   * anywhere in your controller:
   * location.skipReload().path(url);
   *
   * to replace in history stack:
   * location.skipReload().path(url).replace();
   */
  angular.module('narvar').factory('LocationSvc', [
    '$location',
    '$route',
    '$rootScope',
    function($location, $route, $rootScope) {
      var pageRoute = $route.current;

      $location.skipReload = function() {
        var unbind = $rootScope.$on('$locationChangeSuccess', function() {
          $route.current = pageRoute;
          unbind();
        });
        return $location;
      };

      if ($location.intercept) {
        throw '$location.intercept is already defined';
      }

      $location.intercept = function(urlPattern, loadUrl) {

        var parsePath = function() {
          var match = $location.path().match(urlPattern);
          if (match) {
            match.shift();
            return match;
          }
        };

        var unbind = $rootScope.$on("$locationChangeSuccess", function() {
          var matched = parsePath();
          if (!matched || loadUrl(matched) === false) {
            return unbind();
          }
          $route.current = pageRoute;
        });
      };

      return $location;
    }
  ]);
}(angular));

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
  angular.module('narvar').controller('MainCtrl', ['TricktionarySvc',
    function (TricktionarySvc) {

      this.tricktionarySvc = TricktionarySvc;

    }]);

}(angular));

(function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name narvar.controller:RootCtrl
   * @description
   * # RootCtrl
   * Root controller to handle app level failures and promise rejections
   */
  angular.module('narvar').controller('RootCtrl', ['$rootScope', '$location', '$window', 'FlashSvc',
    function ($rootScope, $location, $window, FlashSvc) {

      $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        // @todo Graceful failover before launch.
        $window.alert(rejection);
      });

      FlashSvc.clearFlash();

      this.$location = $location;

    }]);

}(angular));

'use strict';

/**
 * @ngdoc function
 * @author seancannon
 * @name narvar.directive.modal
 * @description
 * # modal
 * Reusable modal container
 */
angular.module('narvar').directive('modal', ['$window', '$timeout',
  function ($window, $timeout) {

    return {
      restrict    : 'E',
      scope       : {},
      templateUrl : '/partials/modal',
      link        : function (scope, element, attrs) {

        /**
         * Show the modal by setting visibleWrapper and visibleContent to true.
         * The view has ng-if on those properties.
         * @param params
         * @private
         */
        function _showModal (e, params) {

          params = params || {};

          scope.templateUrl = params.templateUrl || '/partials/404';
          scope.visibleWrapper = true;
          $timeout(function () {
            scope.visibleContent = true;
          }, 700);

          if (typeof params.callback === 'function') {
            params.callback();
          }
        }

        /**
         * Show the modal by setting visibleWrapper and visibleContent to false.
         * The view has ng-if on those properties.
         * @param params
         * @private
         */
        function _hideModal (e, params) {
          params = params || {};

          scope.visibleWrapper = false;
          scope.visibleContent = false;

          if (typeof params.callback === 'function') {
            params.callback();
          }
        }

        /**
         * View be used with ng-include in the modal partial
         * @type {String}
         */
        scope.templateUrl = '/partials/404';

        scope.$on('narvar.showModal', _showModal);
        scope.$on('narvar.hideModal', _hideModal);

        element.bind('click', function (e) {
          if (e.target.className.match('modal-wrapper')) {
            _hideModal();
          }
        });

      } // End link()
    };

  }]);

(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.siteHeader
   * @description
   * # siteHeader
   * Header with logo and nav
   */
  angular.module('narvar').directive('siteHeader', ['R',
    function(R) {
      return {
        restrict    : 'E',
        scope       : {},
        templateUrl : '/partials/site-header',
        link        : function(scope, element, attrs) {

        }
      };
    }]);
}(angular));

(function (angular, R) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.service.TrackingSvc
   * @description
   * # TrackingSvc
   * Service to handle tracking API calls and data persistence
   */
  angular.module('narvar').service('TrackingSvc', ['$resource', '$cacheFactory',
    function ($resource, $cacheFactory) {
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

      /**
       *
       * @type {{tricks: *, search: Function}}
       */
      svc.resources = {

        /**
         * Grab the tracking information from the server.
         * @todo this is a placeholder, remove before delivery
         */
        tracking : $resource('/api/tracking/', null, {
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
}(angular, R));

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

(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.tracking-widget
   * @description
   * # tracking-widget
   * Displays tracking information
   */
  angular.module('narvar').directive('tracking-widget', ['R',
    function(R) {
      return {
        restrict : 'E',
        link     : function(scope, element, attrs) {

        }
      }
    }]);
}(angular));
