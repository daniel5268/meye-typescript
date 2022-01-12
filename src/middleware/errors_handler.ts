/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

import { constants, errors } from '../domain';
import { logger } from '../infrastructure';

const {
  http: { statusCodes: { INTERNAL_ERROR } },
} = constants;

function isCode5xx(code: number): boolean {
  const result = Math.floor(code / 100) === 5;

  return result;
}

export default function errorsHandlerMiddleware(
  error: errors.HttpError,
  _req: any,
  res: express.Response,
  _next: any,
) {
  const { status, message: errorMessage } = error;

  if (isCode5xx(status)) {
    logger.error(error);

    return res.status(INTERNAL_ERROR)
      .send(new errors.HttpError('Internal error, please contact administrator', INTERNAL_ERROR));
  }

  return res.status(status).send(error);
}
