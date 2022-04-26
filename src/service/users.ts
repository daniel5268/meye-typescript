import User from '../domain/entities/User';
import { errors, constants } from '../domain';

const {
  services: { CREATE_USER },
} = constants;
interface UserRepository {
  insertOne(entities: Partial<User>): Promise<void>;
  findOne(conditions: Partial <User>): Promise<User | undefined>;
}

export default class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async create(userInfo: Partial<User>, petitioner: Partial<User>): Promise<void> {
    if (!petitioner.isAdmin) throw new errors.ForbiddenError('Forbidden');

    const { username } = userInfo;
    const foundUser = await this.repository.findOne({ username });

    if (foundUser) throw new errors.ConflictError(`User with username ${username} already created`);

    

    


  }
}
