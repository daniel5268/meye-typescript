/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import {
  Connection, createConnection, ConnectionOptions, getConnection as typeORMGetConnection,
} from 'typeorm';

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

describe('Infrastructure integration tests', () => {
  describe('Database', () => {
    const {
      db: {
        name: dbName, host: dbHost, port: dbPort, user: dbUser, password: dbPassword,
      },
    } = config;

    describe('should work correctly', async () => {
      let connection: Connection;
      let userDBHelper: DatabaseHelper<User>;
      const users: User[] = [userData.userInstance, new User('second_username', 'password')];

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

      beforeEach(async () => {
        connection = await getConnection(options);
        await connection.synchronize(true);
        userDBHelper = new DatabaseHelper<User>(connection, User);
      });

      describe('insert', () => {
        it('should insert correctly', async () => {
          await userDBHelper.insert([userData.userInstance]);

          expect(userData.userInstance.id).to.be.equal(1);
        });
      });

      describe('find', () => {
        beforeEach(async () => {
          await userDBHelper.insert(users);
        });

        type Test = {
          name: string;
          query?: Partial<User>
          expectedRecords: number;
        };

        const tests: Test[] = [
          {
            name: 'should return an empty array when conditions don\'t match with any record',
            query: { username: 'not_found' },
            expectedRecords: 0,
          },
          {
            name: 'should return the entities that match with the provided conditions',
            query: { username: users[0].username },
            expectedRecords: 1,
          },
          {
            name: 'should return all entities when no conditions are provided',
            expectedRecords: 2,
          },
        ];

        tests.forEach((test) => {
          const { name, query, expectedRecords } = test;

          it(name, async () => {
            const foundUsers = await userDBHelper.find(query);
            expect(foundUsers.length).to.be.equal(expectedRecords);
          });
        });
      });

      describe('update', () => {
        beforeEach(async () => {
          await userDBHelper.insert(users);
        });

        it('should update correctly the entities that match with the criteria', async () => {
          const [{ username: oldUsername }] = users;
          const newUsername = 'updated_username';
          await userDBHelper.update({ username: oldUsername }, { username: newUsername });

          const [foundUser] = await userDBHelper.find({ username: newUsername });

          expect(foundUser).not.to.be.undefined;
        });
      });

      describe('delete', () => {
        beforeEach(async () => {
          await userDBHelper.insert(users);
        });

        it('should delete the records that match with the criteria', async () => {
          await userDBHelper.delete({ username: userData.username });

          const foundUsers = await userDBHelper.find();

          expect(foundUsers.length).to.be.equal(1);
        });
      });
    });
  });
});
