import assert from 'assert';

import { errors, constants } from '../../src/domain';

const { http: { statusCodes } } = constants;

describe('Domain unit tests', () => {
  describe('errors', () => {
    const testMessage = 'error';
    it('should create a bad request error', () => {
      const { status, message } = new errors.BadRequestError(testMessage);
      assert.strictEqual(status, statusCodes.BAD_REQUEST);
      assert.strictEqual(message, testMessage);
    });

    it('should create an unauthorized error', () => {
      const { status, message } = new errors.UnauthorizedError(testMessage);
      assert.strictEqual(status, statusCodes.UNAUTHORIZED);
      assert.strictEqual(message, testMessage);
    });

    it('should create a not found error', () => {
      const { status, message } = new errors.NotFoundError(testMessage);
      assert.strictEqual(status, statusCodes.NOT_FOUND);
      assert.strictEqual(message, testMessage);
    });

    it('should create a bad gateway error', () => {
      const { status, message } = new errors.BadGatewayError(testMessage);
      assert.strictEqual(status, statusCodes.BAD_GATEWAY);
      assert.strictEqual(message, testMessage);
    });

    it('should create a forbidden error', () => {
      const { status, message } = new errors.ForbiddenError(testMessage);
      assert.strictEqual(status, statusCodes.FORBIDDEN);
      assert.strictEqual(message, testMessage);
    });
  });
});
