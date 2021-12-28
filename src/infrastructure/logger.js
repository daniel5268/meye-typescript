const log4js = require('log4js');

const { api: { LOG_LEVEL } } = require('./config');

const MEYE_TYPESCRIPT = 'meye-typescript';

exports.initLogger = () => {
  log4js.configure({
    appenders: {
      out: {
        type: 'stdout',
      },
    },
    categories: {
      [MEYE_TYPESCRIPT]: { appenders: ['out'], level: LOG_LEVEL },
      default: { appenders: ['out'], level: LOG_LEVEL },
    },
  });
};

exports.logger = log4js.getLogger(MEYE_TYPESCRIPT);
