import log4js from 'log4js';

import { api } from './config';

export default class Logger {
  private logger: log4js.Logger;

  constructor() {
    const { logLevel, apiName } = api;

    const config: log4js.Configuration = {
      appenders: {
        out: {
          type: 'stdout',
        },
      },
      categories: {
        [apiName]: { appenders: ['out'], level: logLevel },
        default: { appenders: ['out'], level: logLevel },
      },
    };

    log4js.configure(config);

    this.logger = log4js.getLogger(apiName);
  }

  info(s: any, ...args: any[]): void {
    this.logger.info(s, ...args);
  }

  warn(s: any, ...args: any[]): void {
    this.logger.warn(s, ...args);
  }

  error(s: any, ...args: any[]): void {
    this.logger.error(s, ...args);
  }

  debug(s: any, ...args: any[]): void {
    this.logger.debug(s, ...args);
  }
}
