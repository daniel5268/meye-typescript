import User from '../../src/domain/entities/User';

interface UserRepository {
  insert(entities: Partial<User>[]): Promise<void>;
  findOne(conditions: Partial <User>): Promise<User | undefined>;
}

export default class UserService <Type> {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async create(entity: Partial<Type>): Promise<void> {
    const foundEntity = await this.repository.findOne(entity);
    await this.repository.insert(entities);
  }
}
