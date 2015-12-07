'use strict';

module.exports = {
  source : [

    // App-level shared files
    'client/common/js/modules/*.js',
    'client/common/js/app.js',
    'client/common/js/services/*.js',
    'client/common/js/controllers/*.js',
    'client/common/js/filters/*.js',
    'client/common/js/directives/*.js',
    'client/common/js/animations/*.js',

    // Widget specific files
    'client/widgets/*/js/services/*.js',
    'client/widgets/*/js/controllers/*.js',
    'client/widgets/*/js/filters/*.js',
    'client/widgets/*/js/directives/*.js',
    'client/widgets/*/js/animations/*.js'
  ],
  mocks  : ['bower_components/angular-mocks/angular-mocks.js'],
  vendor : [
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-aria/angular-aria.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-messages/angular-messages.js',
    'bower_components/angular-material/angular-material.js',
    'bower_components/ng-file-upload/angular-file-upload.js',
    'bower_components/hammerjs/hammer.js',
    'bower_components/es5-shim/es5-shim.js',
    'bower_components/json3/lib/json3.js',
    'bower_components/ramda/dist/ramda.js'
  ],
  vendorMin : [
    // Add minified references from list above if any break when uglifying
  ]
};
