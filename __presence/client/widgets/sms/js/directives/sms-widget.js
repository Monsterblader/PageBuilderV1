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
          template          : '@'
        },
        templateUrl : 'widgets/sms/templates/sms-widget.html',
        link        : function(scope, element, attrs) {

          var queryString = $location.search();

          scope.messageDelay      = parseInt(R.defaultTo(1000, R.prop('messageDelay', scope)), 10);
          scope.locale            = R.defaultTo('us',     R.prop('locale',            scope));
          scope.showSuccessButton = R.defaultTo(false,    R.prop('showSuccessButton', scope));
          scope.successCallback   = R.defaultTo(false,    R.prop('successCallback',   scope));
          scope.enableCheckbox    = R.defaultTo(false,    R.prop('enableCheckbox',    scope));
          scope.template          = R.defaultTo('widget', R.prop('template',          scope));

          (function() {
            //Show check box if enabled
            smsInput.on('click', function(e){
              e.stopPropagation();
              if (enableCheckbox == true){
                $('#sms-widget-checkbox').slideDown("fast");
              };
            });

            //Change opt in or out on check
            $(document).on('click', '.sms-input-check', function(e){
              e.stopPropagation();
              if (thirdParty == false){
                thirdParty = true;
              } else {
                thirdParty = false;
              }
              hideCheckboxDelayed();
            });
            //Hide opt-in
            $(document).click(function(e) {
              if ( $(e.target).closest(smsInput).length === 0 ) {
                hideCheckbox();
              }
            });
            function hideCheckbox(){
              if ($(smsInput).val().length == 0) {
                setTimeout(function(){
                  $('#sms-widget-checkbox').slideUp("fast");
                }, 500);
              }
            };
            function hideCheckboxDelayed(){
              if ($(smsInput).val().length == 0) {
                setTimeout(function(){
                  $('#sms-widget-checkbox').slideUp("fast");
                }, 5500);
              }
            };
          })

        }
      }
    }]);
}(angular));




(function() {

  /*
   Narvar SMS Signup Widget v1.0
   Dependencies:
   jQuery 1.11.2
   https://code.jquery.com/jquery-1.11.2.min.js
   International Telephone Input v3.0.3
   https://github.com/Bluefieldscom/intl-tel-input.git
   */

  //Wrap the plugin in the $ jQuery alias and adds scope
  (function ( $ ) {
    $.fn.smsWidget = function(options) {

      // Extend default options
      var opts = $.extend({

        smsButton: "#sms-signup",

        template: "widget"
      }, options);


      //Variables
      var smsInput = $(this);//$('#sms-input');
      var msgContainer = $(opts.messageContainer);
      var msgDelay = opts.messageDelay;
      var retailerName = opts.retailerName;
      var carrierName = opts.carrierName;
      var successMsg = opts.successMessage;
      var errorMsg = opts.errorMessage;
      var defaultLocale = opts.defaultLocale.toLowerCase();
      var smsBtn = opts.smsButton;
      var successButton = opts.showSuccessButton;
      var enableCheckbox = opts.enableCheckbox;
      var smsSuccess = opts.successCallback;
      var template = opts.template;
      var pathArray = window.location.pathname.split('/');
      var hostURL = window.location.origin;
      var smsProcess = false;
      var trackingNumbers = $.urlParam('tracking_numbers');
      var	retailerBrand = $.urlParam('brand');
      var	orderNumber = $.urlParam('order_number');
      var thirdParty = true;
      var countryISO = $.urlParam('locale');
      var smsPackage = {};

      //------------------------------------------------------------------------
      //				SMS WIDGET
      //------------------------------------------------------------------------


      //Set Locale
      if (countryISO && countryISO.length > 3){
        countryISO = countryISO.toLowerCase().split(/[^A-Za-z]/)[1].substring(0,2);
      } else {
        countryISO = defaultLocale;
      }
      if (!(countryISO == 'us' || countryISO == 'ca')){
        smsInput.intlTelInput({
          preferredCountries :  [countryISO]
        });
      }

      //Hide message container
      msgContainer.hide();



      //North America telphone formatting: (555) 555-5555
      smsInput.on("keyup paste", function() {

        if (countryISO === 'us' || countryISO === 'ca'){
          // Remove invalid chars from the input
          var input = this.value.replace(/[^0-9\(\)\s\-]/g, "");
          var inputlen = input.length;
          // Get just the numbers in the input
          var numbers = this.value.replace(/\D/g,'');
          var numberslen = numbers.length;
          // Value to store the masked input
          var newval = "";

          //Remove 0 and 1 from begginning - disabled
          //if ( numbers > 3 && numbers[0] === '1' || numbers[0] === '0') numbers = numbers.substring(1);

          // Loop through the existing numbers and apply the mask
          for(var i=0;i<numberslen;i++){
            if(i==0) newval="("+numbers[i];
            else if(i==3) newval+=") "+numbers[i];
            else if(i==6) newval+="-"+numbers[i];
            else newval+=numbers[i];
          }

          // Re-add the non-digit characters to the end of the input that the user entered and that match the mask.
          if( inputlen >=1&&numberslen==0&&input[0]=="(") newval="(";
          else if(inputlen>=6&&numberslen==3&&input[4]==")"&&input[5]==" ") newval+=") ";
          else if(inputlen>=5&&numberslen==3&&input[4]==")") newval+=")";
          else if(inputlen>=6&&numberslen==3&&input[5]==" ") newval+=" ";
          else if(inputlen>=10&&numberslen==6&&input[9]=="-") newval+="-";

          $(this).val(newval.substring(0,14));
        }
      });

      function smsActions (){
        if (template === "footer"){
          $('#sms-widget-checkbox').slideUp("fast");
        }
      };

      function errorMessage(msg){
        $('.sms-body-text').hide();
        msgContainer.removeClass('sms-success').addClass('sms-error').html(errorMsg).fadeIn(msgDelay).fadeOut(msgDelay, function(){
          $('.sms-body-text').fadeIn(msgDelay);
          smsProcess = false;
          return false;
        });
      };

      function successMessage(msg){
        $('.sms-body-text').hide();
        if(successButton == true){
          msgContainer.removeClass('sms-error').addClass('sms-success').html(successMsg).fadeIn(msgDelay, function(){
            $('.sms-widget-form').fadeOut('fast', function(){
              $('.sms-widget-success').fadeIn(msgDelay);
              $('.modal').modal('hide');
            });
          });
        } else {
          msgContainer.removeClass('sms-error').addClass('sms-success').html(successMsg).fadeIn(msgDelay);
          $('#sms-widget-checkbox').fadeOut("fast");
          $('.modal').modal('hide');
        }
        smsProcess = false;
        return false;
      };

      //Post to API
      function smsPost(data) {
        smsProcess = true;
        smsActions();
        smsPackage.tracking_numbers = trackingNumbers;
        smsPackage.carrier = carrierName;
        smsPackage.phone = smsInput.val();
        smsPackage.brand = retailerBrand;
        smsPackage.order_number = orderNumber;
        smsPackage.third_party_signup = thirdParty;
        smsPackage.referer = window.location.href;
        smsJSON = JSON.stringify(smsPackage);

        var phoneLen = smsPackage.phone.length;

        if (phoneLen < 9 && (!(countryISO === 'us' || countryISO === 'ca'))){
          errorMessage();
          return false;
        }
        if (phoneLen < 14 && (countryISO === 'us' || countryISO === 'ca')){
          errorMessage();
          return false;
        }

        else {

          $.ajax({
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            type: 'POST',
            url: postURL,
            crossDomain: true,
            data: smsJSON,
            dataType: 'JSON',
            success: function (data) {
              if (data.status === 'success') {
                //Great success
                successMessage();
                smsProcess = false;
                if(smsSuccess){ smsSuccess();}
                return false;
              } else {
                //Api error response
                errorMsg = data.status;
                errorMessage();
                smsProcess = false;
                return false;
              }
            },
            error: function (data) {
              //No error message
              smsProcess = false;
              return false;
            }
          });
        }
      };
      /* Events */
      $(document).on('click', smsBtn, function () {
        if(!smsProcess){smsPost();}
        return false;
      });

      smsInput.keyup(function(e){
        var code = e.which; // use e.which, normalized across browsers

        if(code==13){
          e.preventDefault();
          if(!smsProcess){smsPost();}
          return false;
        }
      });
      //------------------------------------------------------------------------
      //				END SMS WIDGET
      //------------------------------------------------------------------------
    };
  }( jQuery ));

})
