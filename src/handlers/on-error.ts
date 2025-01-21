import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { httpStatusCode } from '../utils/constants';

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status;

  const statusCode =
    currentStatus !== httpStatusCode.OK
      ? (currentStatus as ContentfulStatusCode)
      : httpStatusCode.INTERNAL_SERVER_ERROR;

  return c.json({ message: err.message }, statusCode);
};

export default onError;
