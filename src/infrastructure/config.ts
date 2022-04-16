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

type APIConfig = {
  port: number;
  logLevel: string;
  apiName: string;
};

const api: APIConfig = {
  port: +PORT,
  logLevel: LOG_LEVEL,
  apiName: 'meye-typescript',
};

type DBConfig = {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
};

const db: DBConfig = {
  name: DB_NAME,
  host: DB_HOST,
  port: +DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
};

const config = {
  db, api,
};

export default config;
export { api, db };
