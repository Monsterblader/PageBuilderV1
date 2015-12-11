(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.smsWidget
   * @description
   * # smsWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('smsWidget', ['R', '$location',
    function(R, $location) {
      return {
        restrict    : 'E',
        scope       : {
          retailerName      : '@',
          carrierName       : '@',
          errorMessage      : '@',
          successMessage    : '@',
          messageDelay      : '@',
          locale            : '@',
          showSuccessButton : '&',
          successCallback   : '&',
          enableCheckbox    : '&',
          template          : '@',
          optInPolicyUrl    : '@',
          optInPolicyLabel  : '@'
        },
        templateUrl : 'widgets/sms/templates/sms-widget.html',
        link        : function(scope, element, attrs) {

          var queryStringParam = R.prop(R.__, $location.search()),
              scopeProp        = R.prop(R.__, scope);

          scope.messageDelay      = parseInt(R.defaultTo(1000, scopeProp('messageDelay')), 10);
          scope.locale            = R.defaultTo('us',     scopeProp('locale') || queryStringParam('locale'));
          scope.showSuccessButton = R.defaultTo(false,    scopeProp('showSuccessButton'));
          scope.successCallback   = R.defaultTo(false,    scopeProp('successCallback'));
          scope.enableCheckbox    = R.defaultTo(false,    scopeProp('enableCheckbox'));
          scope.template          = R.defaultTo('widget', scopeProp('template'));
          scope.retailerName      = R.defaultTo('Retailer', scopeProp('retailerName'));
          scope.carrierName       = R.defaultTo('Carrier',  scopeProp('carrierName'));

          scope.optInPolicyUrl    = R.defaultTo('https://narvar.com', scopeProp('optInPolicyUrl'));
          scope.optInPolicyLabel  = R.defaultTo('Opt-in policy',      scopeProp('optInPolicyLabel'));

          scope.thirdParty = true;
          scope.smsProcess = false;

          scope.trackingNumbers = queryStringParam('tracking_numbers');
          scope.retailerBrand   = queryStringParam('brand');
          scope.orderNumber     = queryStringParam('order_number');
          scope.smsPackage      = {};

          scope.handleInputFocus = function() {
            // TODO ng-animate this
            scope.showCheckbox = scopeProp('enableCheckbox');
          };

          scope.handleCheckboxToggle = function() {
            scope.thirdParty = !scopeProp('thirdParty');
          };

          // TODO Swap jQuery plugin with angular filter
          angular.element('#sms-input').intlTelInput({
            preferredCountries :  [scope.locale]
          });

          // TODO finish porting in sms logic here....
        }
      }
    }]);
}(angular));
