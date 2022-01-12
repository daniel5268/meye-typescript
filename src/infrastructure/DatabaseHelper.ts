import {
  Repository, EntityTarget, Connection, DeepPartial, FindConditions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export default class DatabaseHelper <Type> {
  private repository: Repository<Type>;

  constructor(connection: Connection, target: EntityTarget<Type>) {
    this.repository = connection.getRepository(target);
  }

  public async insert(entity: Partial<Type>[]): Promise<void> {
    await this.repository.insert(entity as DeepPartial<Type>[]);
  }

  public find(conditions?: Partial<Type>): Promise<Type[]> {
    return this.repository.find(conditions as FindConditions<Type>);
  }

  public async update(criteria: Partial<Type>, info: Partial<Type>): Promise<void> {
    await this.repository.update(criteria as FindConditions<Type>, info as QueryDeepPartialEntity<Type>);
  }

  public async delete(criteria: Partial<Type>): Promise<void> {
    await this.repository.delete(criteria as FindConditions<Type>);
  }
}
