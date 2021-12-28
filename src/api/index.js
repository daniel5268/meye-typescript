require('dotenv').config();

const express = require('express');

const { errorsHandlerMiddleware } = require('../middleware');
const { logger: { initLogger, logger }, config: { api: { PORT, API_NAME } } } = require('../infrastructure');
const routes = require('./routes');

initLogger();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorsHandlerMiddleware);

app.listen(PORT, () => {
  logger.info(`${API_NAME} listening at :${PORT}`);
});

module.exports = app;
