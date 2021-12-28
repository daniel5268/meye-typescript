const { http: { statusCodes: { INTERNAL_ERROR } } } = require('../constants');
const { logger: { logger } } = require('../infrastructure');

function isCode5xx(code) {
  const result = Math.floor(code / 100) === 5;

  return result;
}

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  const { status = INTERNAL_ERROR, message: errorMessage } = error;

  if (isCode5xx(status)) {
    logger.error(error);

    return res.status(INTERNAL_ERROR).send({ error: { message: 'Internal error, please contact administrator' } });
  }

  return res.status(status).send({ error: { message: errorMessage } });
};
