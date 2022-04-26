import { Knex } from 'knex'
import * as path from 'path'
import { db } from './src/config'

const database = {
  client: 'pg',
  connection: `postgres://${db.USER}:${db.PASSWORD}@${db.HOST}:${db.PORT}/${db.NAME}`,
  pool: { min: 1, max: db.POOL_SIZE },
  acquireConnectionTimeout: db.ACQUIRE_CONNECTION_TIMEOUT,
} as Knex.Config

export = database;