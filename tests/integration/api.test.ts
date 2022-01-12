import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src/api';
import { constants } from '../../src/domain';

chai.use(chaiHttp);

describe('health check integration tests', () => {
  it('should work correctly', async () => {
    const healthCheckPath = '/health-check';
    const { body, status } = await chai.request(app)
      .get(healthCheckPath);

    expect(status).to.be.equal(constants.http.statusCodes.OK);
    expect(body).to.be.deep.equal({ service_status: 'ok' });
  });
});
