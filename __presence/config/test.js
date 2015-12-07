'use strict';

var R          = require('ramda'),
    moment     = require('moment'),
    winston    = require('winston'),
    logUtils   = require('alien-node-winston-utils');

var DEFAULTS = {
  host : 'localhost'
};

var config = {

  server : {
    host : R.defaultTo(DEFAULTS.host, R.path(['env', 'HOST'], process)),

    // Ports on which to run node instances. Should be n-1 instances, where n is the number of cores.
    enabledPorts : [3000]
  },

  session : {
    secret : 'dev'
  },

  logging : {
    winston : {
      transports : [
        {
          name          : 'console',
          level         : 'debug',
          timestamp     : logUtils.getDateString,
          colorize      : true,
          transportType : 'console'
        }
        //{
        //  name             : 'file',
        //  level            : 'debug',
        //  timestamp        : logUtils.getDateString,
        //  colorize         : true,
        //  transportType    : 'file',
        //  filename         : __dirname + '../spec/support/logs/log.log',
        //  json             : false, // required for formatter to work
        //  formatter        : logUtils.getFormatter,
        //  handleExceptions : true
        //}
      ],
      strategies : {
        console : winston.transports.Console,
        //file    : winston.transports.File
      }
    }
  },

  errors : {
    decorateForJson : function(err) {
      var errCode    = R.prop('code', err),
          statusCode = R.path(['errors', 'errorCodeToHttpStatusCodeMap', errCode], config);

      return {
        err        : err,
        statusCode : R.defaultTo(501, statusCode)
      };
    },
    errorCodeToHttpStatusCodeMap : {
      6000 : 404,
      6001 : 501,
      6002 : 501,
      7000 : 501,
      7001 : 501,
      7002 : 501
    },
    validation : {
      REQUIRED    : {
        code    : 7000,
        message : 'Missing required property'
      },
      UNSUPPORTED : {
        code    : 7001,
        message : 'Unsupported property'
      },
      VALUE       : {
        code    : 7002,
        message : 'Illegal value for property'
      }
    }
  }

};

module.exports = config;

console.log('USING TEST CONFIG');
