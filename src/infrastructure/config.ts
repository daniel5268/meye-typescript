/* eslint-disable max-classes-per-file */
import assert from 'assert';

const {
  PORT, LOG_LEVEL, DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD,
} = process.env;

assert(LOG_LEVEL, 'LOG_LEVEL must be provided in the environment variables');
assert(PORT, 'PORT must be provided in the environment variables');
assert(DB_NAME, 'DB_NAME must be provided in the environment variables');
assert(DB_HOST, 'DB_HOST must be provided in the environment variables');
assert(DB_PORT, 'DB_PORT must be provided in the environment variables');
assert(DB_USER, 'DB_USER must be provided in the environment variables');
assert(DB_PASSWORD, 'DB_PASSWORD must be provided in the environment variables');
class APIConfig {
  port: number;

  logLevel: string;

  apiName: string;

  constructor(port: number, logLevel: string, apiName: string) {
    this.port = port;
    this.logLevel = logLevel;
    this.apiName = apiName;
  }
}

class DBConfig {
  name: string;

  host: string;

  port: number;

  user: string;

  password: string;

  constructor(name: string, host: string, port: number, user: string, password: string) {
    this.name = name;
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
  }
}

const db = new DBConfig(DB_NAME, DB_HOST, +DB_PORT, DB_USER, DB_PASSWORD);
const api = new APIConfig(+PORT, LOG_LEVEL, 'meye-typescript');

const config = {
  db, api,
};

export default config;
export { api, db };
