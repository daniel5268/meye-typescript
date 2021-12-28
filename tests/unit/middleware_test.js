const assert = require('assert');

const middleware = require('../../src/middleware');
const { errors: { BadGatewayError } } = require('../../src/domain');
const { NotFoundError } = require('../../src/domain/errors');

function getMockedRes(wantStatusCode) {
  return {
    status: (statusCode) => ({
      send: (response) => {
        if (statusCode === wantStatusCode) return response;

        throw new Error('unexpected call');
      },
    }),
  };
}

describe('Middleware unit tests', () => {
  describe('errorsHandlerMiddleware', () => {
    const internalError = {
      error: {
        message: 'Internal error, please contact administrator',
      },
    };

    const tests = [
      {
        name: 'should work correctly with a 5xx status code',
        err: new BadGatewayError(),
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
      {
        name: 'should work correctly when no status is passed',
        err: {},
        status: 500,
        wantErr: internalError,
      },
    ];

    tests.forEach((test) => {
      const {
        name, err, wantErr, status,
      } = test;

      it(name, () => {
        const gotErr = middleware.errorsHandlerMiddleware(err, {}, getMockedRes(status), {});

        assert.deepStrictEqual(gotErr, wantErr);
      });
    });
  });
});
