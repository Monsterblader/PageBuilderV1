(function(angular) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name narvar.directive.faqWidget
   * @description
   * # faqWidget
   * Displays tracking information
   */
  angular.module('narvar').directive('faqWidget', ['R',
    function(R) {
      return {
        restrict : 'E',
        scope    : {
          type : '@'
        },
        templateUrl : 'widgets/faq/templates/faq-widget.html',
        link        : function(scope, element, attrs) {
          scope.tabs = [
            {
              title : "Frequently asked question 1?",
              body  : "Answer to frequently asked question 1. Bacon ipsum dolor amet boudin t-bone hamburger leberkas ham hock, turkey pig doner alcatra corned beef. Capicola tri-tip porchetta jerky ball tip shankle pancetta pork loin swine. Prosciutto beef ribs pig sirloin. Sirloin capicola andouille kielbasa tail. Picanha swine pastrami turkey turducken. Sirloin chicken filet mignon tongue jowl. Filet mignon beef ribs ham hock swine tenderloin bacon picanha venison flank drumstick pancetta salami cupim. Tongue andouille ham hock picanha kielbasa brisket pork chop bacon short ribs alcatra porchetta spare ribs ground round shankle. Capicola alcatra kielbasa spare ribs drumstick ribeye. Tri-tip hamburger cupim, jowl kielbasa flank andouille beef turducken pork loin. Tenderloin strip steak chicken, alcatra chuck tail jerky bresaola boudin pancetta. Kielbasa andouille t-bone, jowl turducken ball tip tongue ham kevin hamburger pig pork belly cow shankle. Porchetta turkey turducken, tail ribeye cow chuck jerky shoulder tri-tip."
            },
            {
              title : "Frequently asked question 2?",
              body  : "Answer to frequently asked question 2. Bacon ipsum dolor amet boudin t-bone hamburger leberkas ham hock, turkey pig doner alcatra corned beef. Capicola tri-tip porchetta jerky ball tip shankle pancetta pork loin swine. Prosciutto beef ribs pig sirloin. Sirloin capicola andouille kielbasa tail. Picanha swine pastrami turkey turducken. Sirloin chicken filet mignon tongue jowl. Filet mignon beef ribs ham hock swine tenderloin bacon picanha venison flank drumstick pancetta salami cupim. Tongue andouille ham hock picanha kielbasa brisket pork chop bacon short ribs alcatra porchetta spare ribs ground round shankle. Capicola alcatra kielbasa spare ribs drumstick ribeye. Tri-tip hamburger cupim, jowl kielbasa flank andouille beef turducken pork loin. Tenderloin strip steak chicken, alcatra chuck tail jerky bresaola boudin pancetta. Kielbasa andouille t-bone, jowl turducken ball tip tongue ham kevin hamburger pig pork belly cow shankle. Porchetta turkey turducken, tail ribeye cow chuck jerky shoulder tri-tip."
            },
            {
              title : "Frequently asked question 3?",
              body  : "Answer to frequently asked question 3. Bacon ipsum dolor amet boudin t-bone hamburger leberkas ham hock, turkey pig doner alcatra corned beef. Capicola tri-tip porchetta jerky ball tip shankle pancetta pork loin swine. Prosciutto beef ribs pig sirloin. Sirloin capicola andouille kielbasa tail. Picanha swine pastrami turkey turducken. Sirloin chicken filet mignon tongue jowl. Filet mignon beef ribs ham hock swine tenderloin bacon picanha venison flank drumstick pancetta salami cupim. Tongue andouille ham hock picanha kielbasa brisket pork chop bacon short ribs alcatra porchetta spare ribs ground round shankle. Capicola alcatra kielbasa spare ribs drumstick ribeye. Tri-tip hamburger cupim, jowl kielbasa flank andouille beef turducken pork loin. Tenderloin strip steak chicken, alcatra chuck tail jerky bresaola boudin pancetta. Kielbasa andouille t-bone, jowl turducken ball tip tongue ham kevin hamburger pig pork belly cow shankle. Porchetta turkey turducken, tail ribeye cow chuck jerky shoulder tri-tip."
            }
          ];
        }
      }
    }]);
});
