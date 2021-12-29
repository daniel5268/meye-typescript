import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';

import app from '../../src/api';
import { constants } from '../../src/domain';

chai.use(chaiHttp);

describe('Health-check integration tests', () => {
  it('should work correctly', async () => {
    const healthCheckPath = '/health-check';
    const { body, status } = await chai.request(app)
      .get(healthCheckPath);

    assert.strictEqual(status, constants.http.statusCodes.OK);
    assert.deepStrictEqual(body, { service_status: 'ok' });
  });
});
