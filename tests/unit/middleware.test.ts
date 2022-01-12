import express from 'express';
import { expect } from 'chai';

import { errorsHandler } from '../../src/middleware';
import { constants } from '../../src/domain';
import { HttpError, BadGatewayError, NotFoundError } from '../../src/domain/errors';

const { http: { statusCodes: { INTERNAL_ERROR, NOT_FOUND } } } = constants;

describe('Middleware unit tests', () => {
  describe('errorsHandler', () => {
    const internalError = new HttpError('Internal error, please contact administrator', INTERNAL_ERROR);

    type Test = {
      name: string;
      error: HttpError;
      status: number;
      wantErr: Error;
    };

    const tests: Test[] = [
      {
        name: 'should work correctly with a 5xx status code',
        error: new BadGatewayError('bad gateway'),
        status: INTERNAL_ERROR,
        wantErr: internalError,
      },
      {
        name: 'should work correctly with a 4xx status code',
        error: new NotFoundError('pj with id 3 not found'),
        status: NOT_FOUND,
        wantErr: new NotFoundError('pj with id 3 not found'),
      },
    ];

    tests.forEach((test) => {
      const {
        name, error, wantErr, status,
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

        const gotErr = errorsHandler(error, {}, res as express.Response, {});

        expect(gotErr).to.contain(wantErr);
      });
    });
  });
});
