import log4js from 'log4js';

import { api as apiConfig } from './config';

const MEYE_TYPESCRIPT = 'meye-typescript';

export default class Logger {
  private logger: log4js.Logger;

  constructor() {
    const logLevel = apiConfig.LOG_LEVEL;

    log4js.configure({
      appenders: {
        out: {
          type: 'stdout',
        },
      },
      categories: {
        [MEYE_TYPESCRIPT]: { appenders: ['out'], level: logLevel },
        default: { appenders: ['out'], level: logLevel },
      },
    });

    this.logger = log4js.getLogger(MEYE_TYPESCRIPT);
  }

  info(s: any): void {
    this.logger.info(s);
  }

  warn(s: any): void {
    this.logger.warn(s);
  }

  error(s: any): void {
    this.logger.error(s);
  }

  debug(s: any): void {
    this.logger.debug(s);
  }
}
