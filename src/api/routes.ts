import { Router, Request, Response } from 'express';

import { logger } from '../infrastructure';

const routes = Router();
const usersRouter = Router();

routes.get('/health-check', (_: Request, res: Response) => {
  logger.debug('health-check starts');

  return res.send({ service_status: 'ok' });
});

routes.use('/users', usersRouter);

export default routes;
