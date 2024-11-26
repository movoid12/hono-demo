import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/lib/createApp";
import { httpStatusCode, httpStatusMessages } from "@/utils/constants";

const indexSchema = z.object({
  message: z.string(),
});

const index = createRouter().openapi(createRoute({
  tags: ["Index"],
  method: "get",
  path: "/",
  responses: {
    [httpStatusCode.OK]: {
      content: {
        "application/json": {
          schema: indexSchema,
        },
      },
      description: "Index API Response",
    },
  },
}), (c) => {
  //* handler
  return c.json({ message: httpStatusMessages.OK }, httpStatusCode.OK);
});

export default index;
