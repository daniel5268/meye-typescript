const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/api');

chai.use(chaiHttp);

it('Health check integration test', async () => {
  const healthCheckPath = '/health-check';
  const { body, status } = await chai.request(app).get(healthCheckPath);

  assert.deepStrictEqual(body, { service_status: 'ok' });
  assert.strictEqual(status, 200);
});
