import Logger from './Logger';
import config from './config';
import DatabaseHelper from './DatabaseHelper';

const logger = new Logger();

export default {
  logger,
  config,
  DatabaseHelper,
};

export { logger, config, DatabaseHelper };
