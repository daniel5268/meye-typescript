export const http = {
  statusCodes: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    BAD_GATEWAY: 502,
  },
};

export const enum UserType {
  ADMIN = 'admin',
  MASTER = 'master',
  PLAYER = 'player',
}

export default {
  http,
};
