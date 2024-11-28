import type { NotFoundHandler } from "hono";

import { httpStatusCode, httpStatusMessages } from "@/utils/constants";

const notFound: NotFoundHandler = (c) => {
  return c.json({
    message: `${httpStatusMessages.NOT_FOUND} ==> ${c.req.path}`,
  }, httpStatusCode.NOT_FOUND);
};

export default notFound;
