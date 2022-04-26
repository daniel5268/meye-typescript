// eslint-disable-next-line max-classes-per-file
import { http as httpConstants } from './constants';

const {
  statusCodes: {
    BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, BAD_GATEWAY, FORBIDDEN, CONFLICT,
  },
} = httpConstants;

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, BAD_REQUEST);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, UNAUTHORIZED);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, NOT_FOUND);
  }
}

export class BadGatewayError extends HttpError {
  constructor(message: string) {
    super(message, BAD_GATEWAY);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, FORBIDDEN);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, CONFLICT);
  }
}
