import * as dotenv from 'dotenv';
import express from 'express';

import * as infrastructure from '../infrastructure';
import routes from './routes';
import { errorsHandler } from '../middleware';

class App {
  app: express.Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.app.use(express.json());
    this.app.use(routes);
    this.app.use(errorsHandler);
  }

  listen(): void {
    const port = infrastructure.config.api.PORT;
    this.app.listen(port, () => {
      infrastructure.logger.info(`${infrastructure.config.api.API_NAME} listening at :${port}`);
    });
  }
}

const server = new App();
server.listen();

const { app } = server;

export default app;
