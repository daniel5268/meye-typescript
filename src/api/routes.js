const express = require('express');
const { logger: { logger } } = require('../infrastructure');

const Routes = express.Router();

Routes.get('/health-check', (_, res) => {
  logger.debug('health-check starts');

  res.send({ service_status: 'ok' });
});

module.exports = Routes;
