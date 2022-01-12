import User from './entities/User';

export * as errors from './errors';
export * as constants from './constants';

const models = {
  User,
};

const domain = {
  models,
};

export default domain;
export { models };
