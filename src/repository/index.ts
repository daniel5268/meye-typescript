interface DatabaseHelper<Type> {
  insert(entities: Partial<Type>[]): Promise<Type[]>;
  find(conditions?: Partial<Type>): Promise<Type[]>;
  update(criteria: Partial<Type>, info: Partial<Type>): Promise<void>;
  delete(criteria: Partial<Type>): Promise<void>;
}

export default class Repository <Type> {
  private dbHelper: DatabaseHelper<Type>;

  constructor(dbHelper: DatabaseHelper<Type>) {
    this.dbHelper = dbHelper;
  }

  public async insert(entities: Partial<Type>[]): Promise<Type[]> {
    return this.dbHelper.insert(entities);
  }

  public async insertOne(entity: Partial<Type>): Promise<Type> {
    return (await this.dbHelper.insert([entity]))[0];
  }

  public async find(conditions?: Partial<Type>): Promise<Type[]> {
    return this.dbHelper.find(conditions);
  }

  public async findOne(conditions: Partial <Type>): Promise<Type | undefined> {
    const [found] = await this.dbHelper.find(conditions);

    return found;
  }

  public async update(criteria: Partial<Type>, info: Partial<Type>): Promise<void> {
    await this.dbHelper.update(criteria, info);
  }

  public async delete(criteria: Partial<Type>): Promise<void> {
    await this.dbHelper.delete(criteria);
  }
}
