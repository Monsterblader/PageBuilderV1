(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/calendar/templates/calendar-widget.html',
    '<div class="calendar-container">\n' +
    '  <div class="calendar-row calendar-days">\n' +
    '    <span class="calendar-date" ng-repeat="weekday in weekdays track by $index">{{weekday}}</span>\n' +
    '    <div class="calendar-row" ng-repeat="week in calendarGrid track by $index">\n' +
    '      <span class="calendar-date" ng-repeat="day in week track by $index" ng-class="{highlighted : isHighlighted(day)}" >{{day || \'&nbsp;\'}}</span>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/edd/templates/edd-widget.html',
    '<div class="edd-container">\n' +
    '  <div class="edd-message" ng-class="{\'edd-show-message\' : deliveryStatusMessage}">{{deliveryStatusMessage}}</div>\n' +
    '  <div class="edd-view" ng-class="{\'edd-show-message\' : deliveryStatusMessage}">\n' +
    '    <div class="edd-date-container edd-left" ng-class="{\'edd-single-date\' : isSingleDate}">\n' +
    '      <div class="edd-day">{{estimatedDeliveryRangeStartDay}}</div>\n' +
    '      <div class="edd-month">{{estimatedDeliveryRangeStartMonthName}}</div>\n' +
    '      <div class="edd-date">{{estimatedDeliveryRangeStartDate}}</div>\n' +
    '    </div>\n' +
    '    <div class="edd-range-separator" ng-class="{\'edd-single-date\' : isSingleDate}"></div>\n' +
    '    <div class="edd-date-container edd-right" ng-class="{\'edd-single-date\' : isSingleDate}">\n' +
    '      <div class="edd-day">{{estimatedDeliveryRangeEndDay}}</div>\n' +
    '      <div class="edd-month">{{estimatedDeliveryRangeEndMonthName}}</div>\n' +
    '      <div class="edd-date">{{estimatedDeliveryRangeEndDate}}</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="edd-days-remaining" ng-class="{\'edd-delivered\' : isDelivered}">{{daysRemainingText}}</div>\n' +
    '  <div class="edd-where-is-my-package" ng-class="{\'edd-delivered\' : isDelivered}">\n' +
    '    <span data-advid="{{dataAdvIdPackage}}" class="banner_ad_link" data-href="{{customerCareUrl}}" ng-click="handleBannerAdLinkClick()">{{whereIsMyPackageClickText}}</span>\n' +
    '    <div class="edd-where-is-my-package-tooltip">\n' +
    '      <span class="edd-where-is-my-package-message">{{whereIsMyPackageMessage}}</span>\n' +
    '      <a target="_blank" data-advid="{{dataAdvIdPackage}}" class="banner_ad_link" href="">{{contactInfoClickText}}</a>.\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/footer/templates/footer-widget.html',
    '<div class="container">\n' +
    '  <div class="row">\n' +
    '    <div class="col-xs-6">\n' +
    '      <p class="pull-left">\n' +
    '        <a href="http://corp.narvar.com/" target="_blank">\n' +
    '          <img src="/assets/images/narvar_logo.svg">\n' +
    '        </a>\n' +
    '      </p>\n' +
    '    </div>\n' +
    '    <div class="col-xs-6">\n' +
    '      <p class="pull-right">\n' +
    '        <a href="http://corp.narvar.com/terms/" target="_blank">Terms of Use</a> |\n' +
    '        <a href="http://corp.narvar.com/terms/" target="_blank">Privacy Policy</a>\n' +
    '      </p>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/faq/templates/faq-widget.html',
    '<div class="row">\n' +
    '  <div class="col-xs-12" ng-switch on="type">\n' +
    '    <div id="narvar-faq-slides" class="carousel slide" ng-switch-when="slides">\n' +
    '      <div class="carousel-indicators-with-controls">\n' +
    '        <a class="icon-prev" href="#narvar-faq-slides" data-slide="prev"></a>\n' +
    '        <ol class="carousel-indicators">\n' +
    '          <li data-target="#narvar-faq-slides" data-slide-to="{{$index}}" ng-repeat="tab in tabs track by $index" ng-class="{\'active\': $index === 0}"></li>\n' +
    '        </ol>\n' +
    '        <a class="icon-next" href="#narvar-faq-slides" data-slide="next"></a>\n' +
    '      </div>\n' +
    '      <div class="carousel-inner" role="listbox">\n' +
    '        <div class="carousel-item" ng-repeat="tab in tabs track by $index" ng-class="{\'active\': $index === 0}">\n' +
    '          <p><strong>{{tab.title}}</strong></p>\n' +
    '          <p>{{tab.body}}</p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div id="narvar-faq-tabs" role="tablist" ng-switch-default>\n' +
    '      <div class="panel panel-default" ng-repeat="tab in tabs track by $index">\n' +
    '        <div class="panel-heading" role="tab">\n' +
    '          <p>\n' +
    '            <a data-toggle="collapse" data-parent="#narvar-faq-tabs" href="#narvar-faq-tab-{{$index}}"><strong>{{tab.title}}</strong></a>\n' +
    '          </p>\n' +
    '        </div>\n' +
    '        <div id="narvar-faq-tab-{{$index}}" class="panel-collapse collapse" role="tabpanel" ng-class="{\'in\': $index === 0}">\n' +
    '          {{tab.body}}\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/header/templates/header-widget.html',
    '<h1>HEADER</h1>\n' +
    '<nav class="navbar" ng-class="{\'navbar-fixed-top\':fixed}">\n' +
    '  <a class="navbar-brand navbar-brand-{{align}}" href="{{link}}" alt="{{text}}">\n' +
    '    <span ng-if="img === undefined">{{text}}</span>\n' +
    '    <span class="hiddentext" ng-if="img !== undefined">{{text}}</span>\n' +
    '    <img ng-src="{{img}}" ng-if="img !== undefined">\n' +
    '  </a>\n' +
    '</nav>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/sms/templates/sms-widget.html',
    '<div id="sms-widget" class="container">\n' +
    '  <div class="row">\n' +
    '    <div class="col-xs-6 col-xs-offset-3 col-sm-1 col-md-1 col-sm-offset-0 col-md-offset-0 col-lg-offset-0">\n' +
    '      <div class="sms-icon">\n' +
    '        <img class="banner-ad-img" src="/assets/images/sms-icon_1x.png" data-src@2x="images/sms-icon_2x.png"/>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div class="col-xs-10 col-xs-offset-1 col-sm-7 col-md-6 col-sm-offset-0 col-md-offset-0 col-lg-offset-0">\n' +
    '      <h4 class="sms-header">Get Text Updates</h4>\n' +
    '      <p class="sms-body-text">Know when your package is on the way, about to arrive, and gets delivered.</p>\n' +
    '      <div ng-if="responseMessage"><p class="sms-response-msg">{{responseMessage}}</p></div>\n' +
    '    </div>\n' +
    '    <div class="col-xs-12 col-sm-4 col-md-5 col-sm-offset-0 col-md-offset-0 col-lg-offset-0">\n' +
    '      <input class="col-xs-12 col-md-12 sms-input" id="sms-input" type="tel" name="sms-phone" placeholder="{{placeholderPhone}}" />\n' +
    '      <a href="#" class="sms-widget-btn pull-right" id="sms-signup">Sign Up</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/survey/templates/feedback-comment.html',
    '<div class="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-2 text-left text-center-xs-down">\n' +
    '  <p><strong>{{caption}}</strong></p>\n' +
    '</div>\n' +
    '<div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 text-center text-right-sm-up">\n' +
    '  <div class="input-group input-group-sm">\n' +
    '    <input type="text" class="form-control" placeholder="{{placeholderText}}" ng-model="value">\n' +
    '        <span class="input-group-btn">\n' +
    '          <button type="button"\n' +
    '                  class="btn btn-sm"\n' +
    '                  ng-class="buttonClass"\n' +
    '                  ng-click="record(value)">Submit\n' +
    '          </button>\n' +
    '        </span>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/survey/templates/feedback-complete.html',
    '<div class="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-2 text-left text-center-xs-down">\n' +
    '  <p>\n' +
    '    <strong>{{caption}}</strong><br/>\n' +
    '    {{subtext}}\n' +
    '  </p>\n' +
    '</div>\n' +
    '<div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 text-center text-right-sm-up">\n' +
    '  <a href="{{buttonHref}}" class="btn" ng-class="buttonClass">{{buttonText}}</a>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/survey/templates/feedback-stars.html',
    '<div class="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-2 text-left text-center-xs-down">\n' +
    '  <p><strong>{{caption}}</strong></p>\n' +
    '</div>\n' +
    '<div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 text-center text-right-sm-up">\n' +
    '  <ul class="list-inline">\n' +
    '    <li ng-repeat="adjective in adjectives track by $index">\n' +
    '      <i class="fa survey-stars-star" ng-class="(hoverIndex >= $index) ? \'fa-star\' : \'fa-star-o\'" ng-mouseenter="setCaptionFromAdjectivesIndex($index)" ng-mouseleave="resetCaption()" ng-click="record($index)"></i>\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/survey/templates/feedback-timing.html',
    '<div class="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-2 text-left text-center-xs-down">\n' +
    '  <p><strong>{{caption}}</strong></p>\n' +
    '</div>\n' +
    '<div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 text-center text-right-sm-up">\n' +
    '  <ul class="list-inline">\n' +
    '    <li ng-repeat="adjective in adjectives track by $index">\n' +
    '      <button type="button" class="btn btn-sm" ng-class="buttonClass" ng-mouseenter="setButtonHoverState(true)" ng-mouseleave="setButtonHoverState(false)" ng-click="record(adjective)">{{adjective}}</button>\n' +
    '    </li>\n' +
    '  </ul>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/survey/templates/survey-widget.html',
    '<div class="row" ng-switch on="surveyWidgetCtrl.currentStep">\n' +
    '\n' +
    '  <feedback-stars\n' +
    '      class          = "animate-switch"\n' +
    '      ng-switch-when = "1"\n' +
    '      caption        = "How was your delivery?"\n' +
    '      adjectives     = "[\'Terrible\',\'Bad\',\'Ok\',\'Good\',\'Excellent\']"\n' +
    '  ></feedback-stars>\n' +
    '\n' +
    '  <feedback-timing\n' +
    '      class          = "animate-switch"\n' +
    '      ng-switch-when = "2"\n' +
    '      caption        = "When did your items arrive?"\n' +
    '      adjectives     = "[\'Early\',\'On time\',\'Late\']"\n' +
    '  ></feedback-timing>\n' +
    '\n' +
    '  <feedback-comment\n' +
    '      class            = "animate-switch"\n' +
    '      ng-switch-when   = "3"\n' +
    '      caption          = "Please, tell us more."\n' +
    '      placeholder-text = "Write your comment here..."\n' +
    '  ></feedback-comment>\n' +
    '\n' +
    '  <feedback-complete\n' +
    '      class          = "animate-switch"\n' +
    '      ng-switch-when = "4"\n' +
    '      caption        = "Thank you!"\n' +
    '      subtext        = "Your feedback helps us improve."\n' +
    '      button-text    = "Continue Shopping"\n' +
    '      button-href    = "http://corp.narvar.com/"\n' +
    '  ></feedback-complete>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('widgets/trackingStatus/templates/tracking-status-widget.html',
    '<div class="row">\n' +
    '  <div class="col-xs-12">\n' +
    '    <h1 class="text-{{align}}">{{status}}</h1>\n' +
    '    <img src="{{img}}" class="img-responsive" alt="{{status}}">\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();
