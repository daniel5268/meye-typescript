import { UserType } from '../../src/domain/constants';
import User from '../../src/domain/entities/User';

const username = 'test_username';
const password = 'test_password';

const userConstructorParams: [string, string, string] = [
  username,
  password,
  UserType.ADMIN,
];

const userInstance = new User(...userConstructorParams);

const user = {
  username,
  password,
  userConstructorParams,
  userInstance,
};

export default user;
export {
  username,
  password,
  userConstructorParams,
  userInstance,
};
