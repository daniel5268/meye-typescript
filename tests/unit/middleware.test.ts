import assert from 'assert';
import express from 'express';

import { errorsHandler } from '../../src/middleware';
import { errors } from '../../src/domain';

const { BadGatewayError, NotFoundError } = errors;

describe('Middleware unit tests', () => {
  describe('errorsHandler', () => {
    const internalError = {
      error: {
        message: 'Internal error, please contact administrator',
      },
    };

    const tests = [
      {
        name: 'should work correctly with a 5xx status code',
        err: new BadGatewayError('bad gateway'),
        status: 500,
        wantErr: internalError,
      },
      {
        name: 'should work correctly with a 4xx status code',
        err: new NotFoundError('pj with id 3 not found'),
        status: 404,
        wantErr: {
          error: {
            message: 'pj with id 3 not found',
          },
        },
      },
    ];

    tests.forEach((test) => {
      const {
        name, err, wantErr, status,
      } = test;

      it(name, () => {
        const res = {
          status: (code: number): any => ({
            send: (response: any): any => {
              if (code === status) return response;

              throw new Error('Unexpected calling');
            },
          }),
        };

        const gotErr = errorsHandler(err, {}, res as express.Response, {});

        assert.deepStrictEqual(gotErr, wantErr);
      });
    });
  });
});
