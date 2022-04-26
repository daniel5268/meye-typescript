import { knex } from 'knex';

import { db } from '../config';

const DB = knex({
  client: 'pg',
  connection: `postgres://${db.USER}:${db.PASSWORD}@${db.HOST}:${db.PORT}/${db.NAME}`,
  pool: { min: 1, max: db.POOL_SIZE },
  acquireConnectionTimeout: db.ACQUIRE_CONNECTION_TIMEOUT,
});

export default class DatabaseHelper <Type> {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  public async insert(entities: any): Promise<Type[] | unknown[]> {
    return DB<Type>(this.table).insert(entities).returning('*');
  }
}
