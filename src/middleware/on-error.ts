import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import { INTERNAL_SERVER_ERROR, OK } from "@/utils/constants";

const onError: ErrorHandler = (err, c) => {
  const currentStatus = "status" in err
    ? err.status
    : c.newResponse(null).status;

  const statusCode = currentStatus !== OK
    ? currentStatus as StatusCode
    : INTERNAL_SERVER_ERROR;

  return c.json({ message: err.message }, statusCode);
};

export default onError;
