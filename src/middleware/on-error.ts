import type { ErrorHandler } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';

import { httpStatusCode } from '../utils/constants';

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status;

  const statusCode =
    currentStatus !== httpStatusCode.OK
      ? (currentStatus as StatusCode)
      : httpStatusCode.INTERNAL_SERVER_ERROR;
  // @ts-expect-error
  return c.json({ message: err.message }, statusCode);
};

export default onError;
