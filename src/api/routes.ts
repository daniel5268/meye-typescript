import express from 'express';

import { logger } from '../infrastructure';

const routes = express.Router();

routes.get('/health-check', (_: express.Request, res: express.Response) => {
  logger.debug('health-check starts');

  return res.send({ service_status: 'ok' });
});

export default routes;
