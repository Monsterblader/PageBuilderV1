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
