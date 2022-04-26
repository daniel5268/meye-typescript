import assert from 'assert';

const {
  PORT, LOG_LEVEL, DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD,
  DB_POOL_SIZE, DB_CONNECTION_TIMEOUT, DB_ACQUIRE_CONNECTION_TIMEOUT,
} = process.env;

assert(LOG_LEVEL, 'LOG_LEVEL must be provided in the environment variables');
assert(PORT, 'PORT must be provided in the environment variables');
assert(DB_NAME, 'DB_NAME must be provided in the environment variables');
assert(DB_HOST, 'DB_HOST must be provided in the environment variables');
assert(DB_PORT, 'DB_PORT must be provided in the environment variables');
assert(DB_USER, 'DB_USER must be provided in the environment variables');
assert(DB_PASSWORD, 'DB_PASSWORD must be provided in the environment variables');
assert(DB_POOL_SIZE, 'DB_POOL_SIZE must be provided in the environment variables');
assert(DB_CONNECTION_TIMEOUT, 'DB_CONNECTION_TIMEOUT must be provided in the environment variables');
assert(DB_ACQUIRE_CONNECTION_TIMEOUT, 'DB_ACQUIRE_CONNECTION_TIMEOUT must be provided in the environment variables');

export const api = {
  PORT: +PORT,
  LOG_LEVEL,
  API_NAME: 'meye-typescript',
};

export const db = {
  NAME: DB_NAME,
  HOST: DB_HOST,
  PORT: +DB_PORT,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD,
  POOL_SIZE: +DB_POOL_SIZE,
  ACQUIRE_CONNECTION_TIMEOUT: +DB_ACQUIRE_CONNECTION_TIMEOUT,
};
