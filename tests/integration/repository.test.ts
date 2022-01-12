/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import {
  Connection, createConnection,
  getConnection as typeORMGetConnection,
  ConnectionOptions,
} from 'typeorm';

import Repository from '../../src/repository';
import { config, DatabaseHelper } from '../../src/infrastructure';
import User from '../../src/domain/entities/User';
import { user as userData } from '../data';

async function getConnection(options: ConnectionOptions): Promise<Connection> {
  try {
    return await createConnection(options);
  } catch (error) {
    return typeORMGetConnection();
  }
}

describe('Repository integration tests', () => {
  describe('it should work with typeORM postgres database helper', () => {
    const {
      db: {
        name: dbName, host: dbHost, port: dbPort, user: dbUser, password: dbPassword,
      },
    } = config;

    const options: ConnectionOptions = {
      name: 'default',
      type: 'postgres',
      host: dbHost,
      port: dbPort,
      username: dbUser,
      password: dbPassword,
      database: dbName,
      synchronize: true,
      logging: false,
      entities: [User],
    };

    let connection: Connection;
    let databaseHelper: DatabaseHelper<User>;
    let repository: Repository<User>;
    const users = [userData.userInstance, new User('second_username', 'password')];

    beforeEach(async () => {
      connection = await getConnection(options);
      await connection.synchronize(true);
      databaseHelper = new DatabaseHelper<User>(connection, User);
      repository = new Repository<User>(databaseHelper);
    });

    it('insert', async () => {
      await repository.insert([userData.userInstance]);

      expect(userData.userInstance.id).to.be.equal(1);
    });

    it('insertOne', async () => {
      await repository.insertOne(userData.userInstance);

      expect(userData.userInstance.id).to.be.equal(1);
    });

    describe('find', () => {
      beforeEach(async () => {
        await databaseHelper.insert(users);
      });

      type Test = {
        name: string;
        query?: Partial<User>
        expectedRecords: number;
      };

      const tests: Test[] = [
        {
          name: 'should return all the records when no conditions are provided',
          expectedRecords: 2,
        },
        {
          name: 'should return the records that match with the provided conditions',
          query: { username: userData.username },
          expectedRecords: 1,
        },
      ];

      tests.forEach((test) => {
        const { name, query, expectedRecords } = test;

        it(name, async () => {
          const foundUsers = await repository.find(query);

          expect(foundUsers.length).to.be.equal(expectedRecords);
        });
      });
    });

    describe('findOne', () => {
      beforeEach(async () => {
        await databaseHelper.insert(users);
      });

      type Test = {
        name: string,
        conditions: Partial<User>,
        wasFound: boolean
      };

      const tests: Test[] = [
        {
          name: 'should return undefined when the user is not found',
          conditions: { username: 'not_found' },
          wasFound: false,
        },
        {
          name: 'should return undefined when the user is not found',
          conditions: { username: userData.username },
          wasFound: true,
        },
      ];

      tests.forEach((test) => {
        const { name, conditions, wasFound } = test;

        it(name, async () => {
          const foundUser = await repository.findOne(conditions);

          expect(foundUser !== undefined).to.be.equal(wasFound);
        });
      });
    });

    describe('update', () => {
      beforeEach(async () => {
        await databaseHelper.insert(users);
      });

      it('should update correctly', async () => {
        const newUserName = 'new_username';
        await repository.update({ username: userData.username }, { username: newUserName });

        const updatedUser = await databaseHelper.find({ username: newUserName });

        expect(updatedUser).not.to.be.undefined;
      });
    });

    describe('delete', () => {
      beforeEach(async () => {
        await databaseHelper.insert(users);
      });

      it('should delete correctly', async () => {
        await repository.delete({ username: userData.username });

        const allUsers = await databaseHelper.find();

        expect(allUsers.length).to.be.equal(1);
      });
    });
  });
});
