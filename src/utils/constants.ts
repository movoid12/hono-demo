import createMessageObjectSchema from '../openapi/schemas/create-message-schema';
// TODO: add after making sure no type errors in httpStatusMessages
// import * as http from 'node:http';

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: 'Required',
  EXPECTED_NUMBER: 'Expected number, received nan',
  NO_UPDATES: 'No updates provided',
} as const;

//* * HTTP status codes
// TODO: add after making sure no type errors in httpStatusMessages
// export const httpStatusCode = Object.fromEntries(
//   Object.entries(http.STATUS_CODES).map(([key, value]) => [value, Number(key)])
// );

export const httpStatusCode = {
  INTERNAL_SERVER_ERROR: 500,
  GATEWAY_TIMEOUT: 504,
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  CREATED: 201,
  // add 204 httpstatus code
  NO_CONTENT: 204,
  UNPROCESSABLE_ENTITY: 422,
} as const;

// ** HTTP status phrases
export const httpStatusMessages = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  GATEWAY_TIMEOUT: 'Gateway Timeout',
  OK: 'OK',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  NOT_ACCEPTABLE: 'Not Acceptable',
  REQUEST_TIMEOUT: 'Request Timeout',
  CONFLICT: 'Conflict',
  CREATED: 'Created',
  NO_CONTENT: 'No Content',
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
} as const;

export const notFoundSchema = createMessageObjectSchema(
  httpStatusMessages.NOT_FOUND,
);
